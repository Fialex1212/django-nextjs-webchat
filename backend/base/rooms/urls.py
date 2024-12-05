from django.urls import path
from .views import (
    RoomListCreatView,
    RoomDetailView,
    CheckRoomPasswordView,
    MessageView,
    TagView,
)

urlpatterns = [
    path('', RoomListCreatView.as_view(), name='rooms_list'),
    path("<str:room_id>/messages/" , MessageView.as_view(), name="messages_list"),
    path("tags/", TagView.as_view(), name="tags_list"),
    path("<str:room_name>/", RoomDetailView.as_view(), name="room_detail"),
    path("<str:room_id>/check_password/", CheckRoomPasswordView.as_view(), name="check_room_password"),
]