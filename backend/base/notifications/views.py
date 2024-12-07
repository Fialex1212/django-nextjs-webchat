from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Notification
from .serializers import NotificationSerializer

class NotificationListView(APIView):

    def get(self, request):
        username = request.headers.get("X-User-Name")
        notifications = Notification.objects.filter(user__username=username, is_read=False)
        serializer = NotificationSerializer(notifications, many=True)
        return Response(serializer.data)

class MarkAsReadView(APIView):
    
    def post(self, request, id):
        try:
            notification = Notification.objects.get(id=id, user=request.user)
            notification.is_read = True
            notification.save()
            return Response({"detail": "Notification marked as read"})
        except Notification.DoesNotExist:
            return Response({"detail": "Notification not found"}, status=404)