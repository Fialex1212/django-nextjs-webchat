from rest_framework import serializers
from .models import (
    Room, 
    Message,
    Tag
)

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name']

class RoomSerializer(serializers.ModelSerializer):
    tags = TagSerializer(many=True)  # Use TagSerializer to include tag details (like name)
    
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

        # Process tags: create if they don't exist, add to room if they do
        for tag_data in tags_data:
            tag, created = Tag.objects.get_or_create(name=tag_data['name'])
            room.tags.add(tag)  # Add the tag to the room

        return room
    
    def to_representation(self, instance):
        # Override `to_representation` to return tag names instead of IDs
        representation = super().to_representation(instance)
        representation['tags'] = [
            {"id": tag.id, "name": tag.name} for tag in instance.tags.all()
        ] # Get tag ids and names
        return representation


        
class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = '__all__'