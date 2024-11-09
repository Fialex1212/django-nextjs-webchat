from django.shortcuts import render, redirect
from .models import Room
from django.http import HttpResponse, JsonResponse

def room(request, room_name):
    room, created = Room.objects.get_or_create(name=room_name)
    if created:
        # Optionally handle the room creation event
        return HttpResponse(f"Room '{room_name}' created successfully!")
    return render(request, 'room.html', {
        'room_name': room_name
    })

def api_room(request, room_name):
    room, created = Room.objects.get_or_create(name=room_name)
    return JsonResponse({'room': room.name, 'created': created})
