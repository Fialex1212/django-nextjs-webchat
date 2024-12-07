from django.urls import path
from .views import (
    NotificationListView,
    MarkAsReadView
)

urlpatterns = [
    path('', NotificationListView.as_view(), name='notifications_list'),
    path('<str:id>/mark-as-read/', MarkAsReadView.as_view(), name="read_notification"),
]