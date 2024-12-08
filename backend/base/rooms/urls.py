from django.urls import path
from .views import (
    RoomListCreatView,
    RoomDetailView,
    CheckRoomPasswordView,
    MessageView,
    TagView,
    ActiveUsers,
    CountActiveUsers
)

urlpatterns = [
    #Room list
    path('', RoomListCreatView.as_view(), name='rooms_list'),
    
    #Room password validating
    path("<str:room_name>/check_password/", CheckRoomPasswordView.as_view(), name="check_room_password"),
    
    #Tags list
    path("tags/", TagView.as_view(), name="tags_list"),
    
    #Rooms activity
    path("active-users/", ActiveUsers.as_view(), name="active_users"),
    path("count-active-users/", CountActiveUsers.as_view(), name="count_active_users"),
    
    path("<str:room_id>/messages/" , MessageView.as_view(), name="messages_list"),
    
    #Room detail
    path("<str:room_name>/", RoomDetailView.as_view(), name="room_detail"),
]