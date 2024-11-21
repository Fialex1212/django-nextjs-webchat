import uuid
from django.db import models
from users.models import CustomUser

class Room(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255, unique=True) # name of the room
    is_private = models.BooleanField(default=False) # if the room is private
    created_at = models.DateTimeField(auto_now_add=True) # when the room was created
    created_by = models.ForeignKey(CustomUser, on_delete=models.SET_DEFAULT, null=False, default=1, related_name="created_rooms") # who created the room
    allowed_users = models.ManyToManyField(CustomUser, blank=True, related_name="rooms") # who can join the room
    
    def __str__(self) -> str: # return the name of the room
        return f"{self.name}, created by {self.created_by.username}, private: {self.is_private}"
    
class Message(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    room = models.ForeignKey(Room, on_delete=models.CASCADE, related_name="messages")
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="messages")
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Message {self.id} in room {self.room.name} by {self.user.username}"