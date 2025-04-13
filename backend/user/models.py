from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.exceptions import ValidationError

class CustomUser(AbstractUser):
    bio = models.CharField(max_length=150, blank=True, default='')
    gender = models.CharField(
        max_length=1,
        choices=[('M', 'Male'), ('F', 'Female'), ('O', 'Other')],
        default='O'
    )
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    image = models.ImageField(null=True, blank=True, default=None)
        
    def __str__(self):
        return f"userid: {self.id}, username: {self.username}" #type: ignore

class OnlineUser(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE,
        related_name="online_user"
    )

    def __str__(self):
        return self.user.__str__()
    
class Follow(models.Model):
    follower = models.ForeignKey(CustomUser, on_delete= models.CASCADE,
        related_name="follower_user"
    )

    following = models.ForeignKey(CustomUser, on_delete= models.CASCADE,
        related_name="following_user"
    )

    followed_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['follower', 'following'], 
                name='unique_follow'
            )
        ]

        indexes = [
            models.Index(fields=['follower']),
            models.Index(fields=['following']),
        ]

    def clean(self):
        if self.follower.id == self.following.id: #type: ignore
            raise ValidationError("Users cannot follow themselves.")

    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.follower.username} is following {self.following.username}."
