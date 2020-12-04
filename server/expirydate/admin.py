from django.contrib import admin
from .models import Users, Items



# We need to register this class with the admin to it which model it is associated with
@admin.register(Users)
class UsersAdmin(admin.ModelAdmin):
    list_display = ['id', 'firstName', 'lastName', 'email', 'password']


@admin.register(Items)
class UsersAdmin(admin.ModelAdmin):
    list_display = ['name', 'typeItem', 'expirationDate', 'user']
