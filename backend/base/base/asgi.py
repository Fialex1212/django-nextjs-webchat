import os
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from django.core.asgi import get_asgi_application
from rooms import routing
from django.urls import path
from rooms.consumers import ChatConsumer

from django.core.asgi import get_asgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "base.settings")

application = ProtocolTypeRouter({
    'http': get_asgi_application(),
    'websocket': AuthMiddlewareStack(
        URLRouter(
            [
                path("ws/chat/<str:room_name>/", ChatConsumer.as_asgi()),
            ]
        )
    )
})
