from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import (
    UserListView, 
    UserDetailView, 
    UserUpdateView, 
    PasswordResetRequestView,
    PasswordResetConfirmView,
    UsernameChangeView,
    AddFriendView,
    
    RegisterView,
    VerifyEmailView,
    LoginView,
    LogoutView,
    delete_user
)

urlpatterns = [
    #Sign-up/Sign-in
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('register/', RegisterView.as_view(), name='register'),
    path('register/verify/', VerifyEmailView.as_view(), name="verify_email"),
    
    #Users info
    path('list/', UserListView.as_view(), name='get_users'),
    path('<str:username>/', UserDetailView.as_view(), name='get_user'),
    path('user/update/', UserUpdateView.as_view(), name='update_user'),
    path('user/delete/<str:user_id>/', delete_user, name='delete_user'),
    
    #Reset password
    path('password-reset-request/', PasswordResetRequestView.as_view(), name='password_reset_request'),
    path('password-reset-confirm/<uuid:uid>/<str:token>/', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    
    #Change username
    path('change-username/', UsernameChangeView.as_view(), name='change_username'),
    
    #Add frined
    path('add-friend/', AddFriendView.as_view(), name='add-friend'),
    
]