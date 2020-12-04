import rest_framework
from rest_framework import serializers
from .models import Users, Items

class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ('id', 'firstName', 'lastName', 'email', 'password')

class ItemsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Items
        fields = ('id', 'name', 'typeItem', 'expirationDate', 'user_id')