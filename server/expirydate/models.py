from django.db import models


class Users(models.Model):
    # expirydate_users

    firstName = models.CharField(max_length=100)
    lastName = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    password = models.CharField(max_length=100)


class Items(models.Model):
    # expirydate_items

    name = models.CharField(max_length=100)
    typeItem = models.CharField(max_length=100, blank=True)
    expirationDate = models.CharField(max_length=100)
    user = models.ForeignKey(Users, related_name="items", on_delete = models.CASCADE, default = 1)


    # tell django what the message represntation should be like
    def __str__(self):
        return str(self.user_id)

