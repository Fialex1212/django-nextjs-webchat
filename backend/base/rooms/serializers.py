from rest_framework import serializers
from .models import (
    Room, 
    Message
)

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = '__all__'
        
    def validate(self, attrs):
        # Check if the room is private and if password is provided
        if attrs.get('is_private') and not attrs.get('password'):
            raise serializers.ValidationError("Password is required for private rooms.")
        return attrs
        
class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = '__all__'