from django.db import models
from django.conf import settings
from django.utils import timezone

class NotificationManager(models.Manager):
    def unread(self):
        """Return all unread notifications."""
        return self.filter(is_read=False)

class Notification(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="notifications")
    message = models.CharField(max_length=255)
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True , db_index=True)
    objects = NotificationManager()  # Custom manager
    notification_type = models.CharField(max_length=50, choices=[
    ('INFO', 'info'),
    ('WARNING', 'WARNING'),
    ('ERROR', 'Error'),
    ('SUCCESS', 'Success'),
    ], default='INFO')

    def __str__(self):
        return f"Notification for {self.user.user_id}: {self.message}"
    
    def mark_as_read(self):
        """Mark the notification as read"""
        self.is_read = True
        self.save()

    @property
    def was_created_recently(self):
        """Property to check if notification was created recently (within 24 hours)"""
        return self.created_at >= timezone.now() - timezone.timedelta(hours=24)