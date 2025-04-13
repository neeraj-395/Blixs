from django.db import models
from user.models import CustomUser

class ChatRoom(models.Model):
	name = models.CharField(max_length=30, null=True, blank=True)
	members = models.ManyToManyField(CustomUser)

	def __str__(self):
		return f"{self.id} -> {self.name}"

class ChatMessage(models.Model):
	chat = models.ForeignKey(ChatRoom, on_delete=models.SET_NULL, null=True)
	user = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, null=True)
	message = models.CharField(max_length=255)
	timestamp = models.DateTimeField(auto_now_add=True)

	def __str__(self):
		return self.message