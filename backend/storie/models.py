from django.utils import timezone
from django.conf import settings
from django.db import models


def default_expiry():
    return timezone.now() + timezone.timedelta(hours=24)

class StoryManager(models.Manager):
    def active(self):
        return self.filter(expires_at__gt=timezone.now())

class Storie(models.Model):
    story_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="stories")
    image = models.ImageField(upload_to="images/story_pics/")
    created_at = models.DateTimeField(auto_now_add=True , db_index=True)
    expires_at = models.DateTimeField(default=default_expiry)
    objects = StoryManager()  # Custom manager

    def __str__(self):
        return f"Story by {self.user.user_id}"