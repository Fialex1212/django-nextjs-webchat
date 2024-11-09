from django.urls import path
from . import views

urlpatterns = [
    path('chat/<str:room_name>/', views.room, name='room'),
    path('room/<str:room_name>/', views.api_room, name='api_room'),
]