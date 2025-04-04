import json
import re
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.layers import get_channel_layer
import uuid

ACTIVE_ROOMS = {}


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.user_id = str(uuid.uuid4())
        raw_room_id = self.scope["url_route"]["kwargs"]["room_id"]
        self.room_id = re.sub(r"[^a-zA-Z0-9._-]", "_", raw_room_id)
        self.room_group_name = f'chat_{self.room_id}'

        self.channel_layer = get_channel_layer()

        ACTIVE_ROOMS[self.room_id] = ACTIVE_ROOMS.get(self.room_id, 0) + 1

        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()

        await self.send(
            text_data=json.dumps(
                {
                    "type": "connection_established",
                    "user_id": self.user_id,
                    "room_id": self.room_id,
                }
            )
        )

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)
        ACTIVE_ROOMS[self.room_id] -= 1
        if ACTIVE_ROOMS[self.room_id] <= 0:
            del ACTIVE_ROOMS[self.room_id]

    async def receive(self, text_data):
        if not text_data:  # Проверяем, не пустые ли данные
            await self.send(
                text_data=json.dumps(
                    {"type": "error", "message": "Empty message received"}
                )
            )
            return

        try:
            text_data_json = json.loads(text_data)  # Пытаемся распарсить JSON
            message = text_data_json.get("message")  # Безопасно извлекаем 'message'
            if not message:
                await self.send(
                    text_data=json.dumps(
                        {"type": "error", "message": 'No "message" field in data'}
                    )
                )
                return

            # Отправляем сообщение в группу
            await self.channel_layer.group_send(
                self.room_group_name,
                {"type": "chat_message", "message": message, "user_id": self.user_id},
            )
        except json.JSONDecodeError:
            await self.send(
                text_data=json.dumps(
                    {"type": "error", "message": "Invalid JSON format"}
                )
            )

    async def chat_message(self, event):
        await self.send(
            text_data=json.dumps(
                {
                    "type": "message",
                    "message": event["message"],
                    "user_id": event["user_id"],
                }
            )
        )


class RoomListConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()

    async def receive(self, text_data):
        if text_data == "get_rooms":
            await self.send(
                text_data=json.dumps(
                    {"type": "room_list", "rooms": list(ACTIVE_ROOMS.keys())}
                )
            )
