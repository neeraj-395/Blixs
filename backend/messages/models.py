from datetime import timezone
from django.conf import settings
from django.db import models

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