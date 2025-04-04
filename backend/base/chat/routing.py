from django.urls import re_path
from .consumers import ChatConsumer, RoomListConsumer

websocket_urlpatterns = [
    re_path(r'ws/chat/(?P<room_id>\w+)/$', ChatConsumer.as_asgi()),
    re_path(r'ws/room_list/$', RoomListConsumer.as_asgi()),
]