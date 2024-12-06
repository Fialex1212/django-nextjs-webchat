from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Q
from rooms.models import Room
from rooms.serializers import RoomSerializer
from users.models import CustomUser
from users.serializers import UserSerializers

class SearchView(APIView):

    def get(self, request):
        query = request.query_params.get('q', '')
        
        if query:
            users = CustomUser.objects.filter(
                Q(username__icontains=query)
            )
            rooms = Room.objects.filter(
                Q(name__icontains=query)
            )
        else:
            users = CustomUser.objects.none()
            rooms = Room.objects.none()
        
        users_serializer = UserSerializers(users, many=True).data
        rooms_serializer = RoomSerializer(rooms, many=True).data
        
        results = {
            "users": users_serializer,
            "rooms": rooms_serializer,
        }
        
        return Response(results)
