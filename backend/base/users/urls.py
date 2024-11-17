from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import (
    UserRegisterView, 
    UserListCreateView, 
    UserDetailView, 
    UserUpdateView, 
    CustomTokenObtainPairView,
    PasswordResetRequestView,
    PasswordResetConfirmView,
    UsernameChangeView
)

urlpatterns = [
    #Sign-up/Sign-in
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', UserRegisterView.as_view(), name='register'),
    
    #Users info
    path('list/', UserListCreateView.as_view(), name='get_users'),
    path('user/<str:id>/', UserDetailView.as_view(), name='get_user'),
    path('user/update/', UserUpdateView.as_view(), name='update_user'),
    
    #Reset password
    path('password-reset-request/', PasswordResetRequestView.as_view(), name='password_reset_request'),
    path('password-reset-confirm/<uuid:uid>/<str:token>/', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    
    #Change username
    path('change-username/', UsernameChangeView.as_view(), name='change_username'),
    
]