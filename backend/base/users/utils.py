from notifications.models import Notification

def add_friend(requesting_user, target_user):
    if requesting_user != target_user:
        # Add the target user as a friend
        requesting_user.friends.add(target_user)
        
        # Create a notification for the target user
        message = f"{requesting_user.username} has added you as a friend."
        Notification.objects.create(user=target_user, message=message)