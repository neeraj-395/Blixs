from django.db import models
from django.conf import settings
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType

class Post(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="posts")
    caption = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)

    def id(self):
        return self.id

    def __str__(self):
        return f"Post With Id '{self.id}' by {self.user.username} - {self.caption[:20]}..."

class PostImage(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to="posts/%Y/%m/%d/")

    def __str__(self):
        return f"Image for {self.post.user.username}'s Post ID - {self.post.id}"


class SavedPost(models.Model):
    post = models.ForeignKey(Post , on_delete= models.CASCADE , related_name="saved_posts") 
    user = models.ForeignKey(settings.AUTH_USER_MODEL , on_delete= models.CASCADE , related_name="saved_posts")
    created_at = models.DateTimeField(auto_now_add=True , db_index=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['post', 'user'], name='unique_saved_post_per_user')
        ]

    def __str__(self):
        return f"{self.user.username} saved {self.post.user.username}'s Post ID - {self.post.id}"

class Hashtag(models.Model):
    tag = models.CharField(max_length=100 , blank=False)
    content_type = models.ForeignKey(ContentType , on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey("content_type","object_id") 
    created_at = models.DateTimeField(auto_now_add=True , db_index=True)

    def id(self):
        return self.id

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
        return f"{self.user.username} liked {self.content_object or 'Deleted Object'}"
    
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
            return f"{self.user.username} replied to {self.parent.user.username.upper()}'s comment - {self.commented_text[:10]}..."
        elif isinstance(self.content_object, Post):
            return f"{self.user.username} commented on {self.content_object.user.username.upper()}'s post: {self.commented_text[:30]}"
        else:
            return f"{self.user.username} commented on {self.content_object or 'Deleted Object'}: {self.commented_text[:30]}"
        
