from django.urls import path
from .views import (
    RoomListCreatView,
    MessageView
)

urlpatterns = [
    path('', RoomListCreatView.as_view(), name='rooms_list'),
    path("<str:room_id>/messages/" , MessageView.as_view(), name="messages_list"),
]