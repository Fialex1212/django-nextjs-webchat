from rest_framework import serializers
from .models import (
    Room, 
    Message,
    Tag
)

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = '__all__'

class RoomSerializer(serializers.ModelSerializer):
    tags = TagSerializer(many=True)
    class Meta:
        model = Room
        fields = '__all__'
        
    def validate(self, attrs):
        # Check if the room is private and if password is provided
        if attrs.get('is_private') and not attrs.get('password'):
            raise serializers.ValidationError("Password is required for private rooms.")
        return attrs
    
    def create(self, validated_data):
        # Extract the tags data from the validated data
        tags_data = validated_data.pop('tags', [])

        # Create the Room instance
        room = Room.objects.create(**validated_data)

        # Create Tag instances and associate them with the Room
        for tag_data in tags_data:
            tag, created = Tag.objects.get_or_create(**tag_data)
            room.tags.add(tag)

        return room
        
class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = '__all__'