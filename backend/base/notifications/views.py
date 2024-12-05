from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Notification
from .serializers import NotificationSerializer

class NotificationListView(APIView):

    def get(self, request):
        # Get all unread notifications for the logged-in user
        notifications = Notification.objects.filter(user=request.user, is_read=False)
        # Serialize the notifications
        serializer = NotificationSerializer(notifications, many=True)
        return Response(serializer.data)
