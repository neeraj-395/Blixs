from rest_framework import serializers
from storie.models import Storie


class StorieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Storie
        fields = "__all__"