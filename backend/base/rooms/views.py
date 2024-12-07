from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from rest_framework import status
from rest_framework.generics import ListCreateAPIView
from .serializers import (
    RoomSerializer,
    MessageSerializer,
    TagSerializer
)
from .models import (
    Room,
    Message,
    Tag
)

class RoomListCreatView(ListCreateAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
    
class RoomDetailView(APIView):
    def get(self, request, room_name):
        try:
            room = Room.objects.get(name=room_name)
            data = {"room_id": room.id, "room_name": room.name, "is_private": room.is_private}
            return Response(data, status=status.HTTP_200_OK)
        except Room.DoesNotExist:
            raise NotFound({"detail": "Room not found"}, status=status.HTTP_404_NOT_FOUND)
    
    def delete(self, request, room_name):
        room = Room.objects.get(name=room_name)
        room.delete()
        return Response("Room deleted successfully", status=status.HTTP_204_NO_CONTENT)
    
class MessageView(APIView):
    def get(self, request, room_id):
        messages = Message.objects.filter(room_id=room_id).order_by("created_at")
        serializer = MessageSerializer(messages, many=True)
        return Response(serializer.data)
    
    def post(self, request, room_id):
        serializer = MessageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(room_id=room_id)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CheckRoomPasswordView(APIView):
    def post(self, request, room_name):
        try:
            room = Room.objects.get(name=room_name)
            password = request.data.get("password", "")
            if room.password == password:
                return Response({"detail": "Password correct"}, status=status.HTTP_200_OK)
            return Response({"detail": "Incorrect password"}, status=status.HTTP_403_FORBIDDEN)
        except Room.DoesNotExist:
            return Response({"detail": "Room not found"}, status=status.HTTP_404_NOT_FOUND)

    
class TagView(APIView):
    def get(self, request):
        tags = Tag.objects.all()
        serializer = TagSerializer(tags, many=True)
        return Response(serializer.data)