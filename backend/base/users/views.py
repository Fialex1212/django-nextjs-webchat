import random
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .serializers import UserSerializers, UserUpdateSerializers
from rest_framework import generics
from .models import CustomUser, EmailVerification
from django.urls import reverse
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.core.mail import send_mail
from django.conf import settings
from uuid import UUID
from .utils import add_friend
from django.contrib.auth import get_user_model
from django.utils.timezone import now
from datetime import timedelta
from django.contrib.auth import authenticate, login, logout
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt

token_generator = PasswordResetTokenGenerator()

class RegisterView(APIView):
    def post(self, request):
        username = request.data.get("username")
        email = request.data.get("email")
        password = request.data.get("password")
        
        if not username or not email or not password:
            return Response({'error': 'Email and password are required.'}, status=status.HTTP_400_BAD_REQUEST)
        
        verification_code = random.randint(100000, 999999)
        
        EmailVerification.objects.update_or_create(
            email=email,
            defaults={
                'code': verification_code,
                'expires_at': now() + timedelta(minutes=3)
            }
        )
        
        send_mail(
                'Verify your email',
                f'Your verification code is {verification_code}',
                settings.EMAIL_HOST_USER,
                [email],
                fail_silently=False,
            )
        
        return Response({'message': 'Verification email sent. Please check your email.'}, status=status.HTTP_200_OK)

class VerifyEmailView(APIView):
    def post(self, request):
        username = request.data.get("username")
        email = request.data.get("email")
        code = request.data.get("code")
        
        if not email or not code:
            return Response({'error': 'Email and code are required.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            verification = EmailVerification.objects.get(email=email)
        except EmailVerification.DoesNotExist:
            return Response({'error': 'Verification code not found.'}, status=status.HTTP_404_NOT_FOUND)

        if verification.is_expired():
            return Response({'error': 'Verification code expired.'}, status=status.HTTP_400_BAD_REQUEST)

        if verification.code != code:
            return Response({'error': 'Invalid verification code.'}, status=status.HTTP_400_BAD_REQUEST)

        CustomUser.objects.create_user(email=email, username=username, password=request.data.get('password'))
        verification.delete() 

        return Response({'message': 'Email verified. User created successfully.'}, status=status.HTTP_201_CREATED)

class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        user = authenticate(request, email=email, password=password)

        if user is None:
            return Response({'error': 'Invalid credentials.'}, status=status.HTTP_401_UNAUTHORIZED)

        login(request, user)
        
        return Response({
            'message': 'Login successful.',
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email,
            }
        }, status=status.HTTP_200_OK)
        
@method_decorator(csrf_exempt, name='dispatch')
class LogoutView(APIView):
    def post(self, request):
        if request.user.is_authenticated:
            logout(request)
            return Response({'message': 'Logout successful.'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'User is not authenticated.'}, status=status.HTTP_401_UNAUTHORIZED)

    
class UserListView(generics.ListAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializers
    
class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializers
    lookup_field = 'username'
    
class UserUpdateView(generics.UpdateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserUpdateSerializers
    permission_classes = [IsAuthenticated]
    
    def get_object(self):
        return self.request.user

class PasswordResetRequestView(APIView):
    def post(self, request):
        email = request.data.get('email')
        if not email:
            return Response({"error": "Email is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            user = CustomUser.objects.get(email=email)
            token = token_generator.make_token(user)
            reset_link = request.build_absolute_uri(
                reverse('password_reset_confirm', kwargs={'uid': user.id, 'token': token})  # Assuming user.id is a UUID
            )

            send_mail(
                'Password Reset Request',
                f'Click the link to reset your password: {reset_link}',
                settings.EMAIL_HOST_USER,
                [email],
                fail_silently=False,
            )
            return Response({"message": "Password reset link sent to email"}, status=status.HTTP_200_OK)
        
        except CustomUser.DoesNotExist:
            return Response({"error": "User with this email does not exist"}, status=status.HTTP_404_NOT_FOUND)


class PasswordResetConfirmView(APIView):
    def post(self, request, uid, token):
        uid = request.data.get('uid')
        token = request.data.get('token')
        new_password = request.data.get('new_password')
        
        if not uid or not token or not new_password:
            return Response({"error": "Missing parameters"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            user = CustomUser.objects.get(id=UUID(uid))
            if token_generator.check_token(user, token):
                user.set_password(new_password)
                user.save()
                return Response({"message": "Password has been reset successfully"}, status=status.HTTP_200_OK)
            else:
                return Response({"error": "Invalid token"}, status=status.HTTP_400_BAD_REQUEST)
        
        except (CustomUser.DoesNotExist, ValueError):
            return Response({"error": "Invalid user"}, status=status.HTTP_404_NOT_FOUND)
        
class UsernameChangeView(APIView):
    def post(self, request):
        email = request.data.get('email')
        user = CustomUser.objects.get(email=email)
        new_username = request.data.get('new_username')
        
        if not new_username:
            return Response({"error": "New username is required"}, status=status.HTTP_400_BAD_REQUEST)
        elif new_username == user.username:
            return Response({"error": "New username cannot be the same as the current username"}, status=status.HTTP_400_BAD_REQUEST)
        
        user.username = new_username
        user.save()
        
        return Response({"message": "Username has been changed successfully"}, status=status.HTTP_200_OK)
    
class AddFriendView(APIView):
    
    def post(self, request):
        requesting_user = request.user
        target_user_id = request.data.get("target_user_id")
        
        if not target_user_id:
            return Response({"detail": "Target user ID is required"}, status=status.HTTP_400_BAD_REQUEST)
    
        try:
            target_user = get_user_model().objects.get(id=target_user_id)
        except get_user_model().DoesNotExist:
            return Response({"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        
        add_friend(requesting_user, target_user)
        return Response({"detail": "Friend added successfully"}, status=status.HTTP_200_OK)
    
def delete_user(request, user_id):
    user = get_object_or_404(CustomUser, id=user_id)
    user.delete()