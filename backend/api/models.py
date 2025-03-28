from django.db import models
from django.conf import settings
from django.contrib.postgres.fields import ArrayField
from django.utils import timezone
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from datetime import timedelta
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _



    
  



def default_expiry():
    return timezone.now() + timedelta(hours=24)

class StoryManager(models.Manager):
    def active(self):
        return self.filter(expires_at__gt=timezone.now())  # Only get active stories

class Story(models.Model):
    story_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="stories")
    image = models.ImageField(upload_to="images/story_pics/")
    created_at = models.DateTimeField(auto_now_add=True , db_index=True)
    expires_at = models.DateTimeField(default=default_expiry)
    objects = StoryManager()  # Custom manager

    def __str__(self):
        return f"Story by {self.user.user_id}"

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

class Message(models.Model):
    sender = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='sent_messages')
    recipient = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='received_messages')
    content = models.TextField(blank=True,null=True)
    sent_at = models.DateTimeField(auto_now_add=True)
    read_at = models.DateTimeField(null=True, blank=True)
    is_read = models.BooleanField(default=False)
    edited_at = models.DateTimeField(null=True, blank=True)
    is_edited = models.BooleanField(default=False)
    deleted_for_user = models.ManyToManyField(settings.AUTH_USER_MODEL, blank=True, related_name="deleted_message")
    is_draft = models.BooleanField(default=False)
    scheduled_at = models.DateTimeField(null=True, blank=True)
    replied_to = models.ForeignKey('self',null=True, blank=True, on_delete=models.DO_NOTHING , related_name="replies")
    forward_from = models.ForeignKey('self',null=True, blank=True, on_delete=models.DO_NOTHING , related_name="forwards")
    
    def __str__(self):
        return f"Message from {self.sender.username} to {self.recipient.username}"

    def mark_as_read(self):
        self.is_read = True
        self.read_at = timezone.now()
        self.save()

    def edit_message(self,new_content):
        self.content = new_content
        self.edited_at = timezone.now()
        self.is_edited = True
        self.save()
        return self.content

    def delete_for_user(self ,user):
        self.deleted_for_user.add(user)

    def delete_message(self, user, for_everyone=False):
        if for_everyone:
            self.content = "[This message was deleted]"
            self.save()
        else:
            self.deleted_for_user.add(user)
            self.save()