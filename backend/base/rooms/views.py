from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import ListCreateAPIView
from .serializers import (
    RoomSerializer,
    MessageSerializer
)
from .models import (
    Room,
    Message
)

class RoomListCreatView(ListCreateAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
    
class MessageView(APIView):
    def get(self, request, room_id):
        messages = Message.objects.filter(room_id=room_id).order_by("created_at")
        serializer = MessageSerializer(messages, many=True)
        return Response(serializer.data)
    
    def post(self, request, room_id):
        serializer = MessageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(room_id=room_id)
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)