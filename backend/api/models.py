from django.db import models
from django.conf import settings
from django.utils import timezone
from django.core.exceptions import ValidationError
from django.core.validators import RegexValidator
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from datetime import timedelta
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _

class CustomUser(AbstractUser):
    user_id = models.AutoField(primary_key=True)
    email = models.EmailField(unique=True)
    bio = models.CharField(max_length=100, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    gender = models.CharField(
        max_length=1,
        choices=[('M', 'Male'), ('F', 'Female'), ('P', 'Prefer not to say')],
        default='P'
    )
    profile_pic = models.ImageField(upload_to="profile_pics/", null=True, blank=True)

    @property
    def id(self):
        return self.user_id  # Ensure 'id' is mapped to 'user_id'
        
    def __str__(self):
        return self.user_id

class Post(models.Model):
    post_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="posts")
    caption = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True , db_index=True)

    def __str__(self):
      return f"Post {self.post_id} by {self.user.user_id} - {self.caption[:20]}..."

class PostImage(models.Model):
    def post_image_upload_path(instance, filename):
        return f"posts/{instance.post.post_id}/{filename}"

    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="images")
    image = models.ImageField(upload_to=post_image_upload_path)

    def __str__(self):
        return f"Image {self.id} for Post {self.post.post_id}"


class Hashtag(models.Model):
    id = models.AutoField(primary_key=True)  # Explicit primary key
    tag = models.CharField(max_length=100 , blank=False)
    content_type = models.ForeignKey(ContentType , on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey("content_type","object_id") 
    created_at = models.DateTimeField(auto_now_add=True , db_index=True)

    def __str__(self):
        return self.tag  

class Like(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="likes")
    content_type = models.ForeignKey(ContentType , on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey('content_type','object_id') 
    liked_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['user', 'content_type', 'object_id'], name='unique_like_per_user_per_object')
        ]

    def __str__(self):
        return f"{self.user.user_id} liked {self.content_object or 'Deleted Object'}"
    
class Comment(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete= models.CASCADE , related_name="user_comment")
    content_type = models.ForeignKey(ContentType , on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey('content_type','object_id') 
    commented_text = models.CharField(max_length=200 , blank=False )
    created_at = models.DateTimeField(auto_now_add=True , db_index=True)
    parent = models.ForeignKey('self' , blank=True , null=True ,on_delete=models.CASCADE , related_name="replies")

    def __str__(self):
        if self.parent:
            return f"Reply to {self.parent.id} by {self.user.user_id}"
        
        return f"Comment by {self.user.user_id} on {self.content_object or 'Deleted Object'}: {self.commented_text[:30]}"

class SavedPost(models.Model):
    post = models.ForeignKey(Post , on_delete= models.CASCADE , related_name="saved_posts") 
    user = models.ForeignKey(settings.AUTH_USER_MODEL , on_delete= models.CASCADE , related_name="saved_posts")
    created_at = models.DateTimeField(auto_now_add=True , db_index=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['post', 'user'], name='unique_saved_post_per_user')
        ]


    def __str__(self):
        return f"{self.user.user_id} saved Post {self.post.post_id}"   

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
        return f"{self.follower.user_id} following {self.following.user_id}"

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
    subject = models.CharField(max_length=299)
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
        return f"Message from {self.sender.user_id} to {self.recipient.user_id}"

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