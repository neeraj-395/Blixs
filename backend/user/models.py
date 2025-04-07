from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.core.exceptions import ValidationError

class CustomUser(AbstractUser):
    bio = models.CharField(max_length=100, blank=True)
    gender = models.CharField(
        max_length=1,
        choices=[('M', 'Male'), ('F', 'Female'), ('O', 'Other')],
        default='O'
    )
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    image = models.ImageField(upload_to="userimg/", null=True, blank=True)

    @property
    def id(self):
        return self.id
        
    def __str__(self):
        return f"userid: {self.id}, username: {self.username}"

class OnlineUser(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)

    def __str__(self):
        return self.user.username
    
class Followers(models.Model):
    follower =  models.ForeignKey(settings.AUTH_USER_MODEL , on_delete= models.CASCADE , related_name="followers")
    following =  models.ForeignKey(settings.AUTH_USER_MODEL , on_delete= models.CASCADE , related_name="following")
    followed_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['follower', 'following'], name='unique_follow')
        ]

    def clean(self):
        if self.follower == self.following:
            raise ValidationError("Users cannot follow themselves.")

    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"({self.follower.username}) Is following ( {self.following.username} )"
