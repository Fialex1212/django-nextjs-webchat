from django.urls import path
from .views import (
    RoomListCreatView,
    MessageView,
    TagView,
)

urlpatterns = [
    path('', RoomListCreatView.as_view(), name='rooms_list'),
    path("<str:room_id>/messages/" , MessageView.as_view(), name="messages_list"),
    path("tags/", TagView.as_view(), name="tags_list"),
]