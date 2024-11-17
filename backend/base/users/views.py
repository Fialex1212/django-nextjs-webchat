from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .serializers import UserRegisterSerializer, UserSerializers, UserUpdateSerializers
from rest_framework import generics
from .models import CustomUser
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import CustomTokenObtainPairSerializer
from django.urls import reverse
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.core.mail import send_mail
from django.conf import settings
from uuid import UUID

token_generator = PasswordResetTokenGenerator()

class UserRegisterView(APIView):
    def post(self, request):
        serializer = UserRegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"Message": "User created successfully!"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class UserListCreateView(generics.ListCreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializers
    
class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializers
    lookup_field = 'id'
    
class UserUpdateView(generics.UpdateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserUpdateSerializers
    permission_classes = [IsAuthenticated]
    
    def get_object(self):
        return self.request.user

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
    
from django.urls import reverse

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