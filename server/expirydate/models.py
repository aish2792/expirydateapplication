from django.db import models

# Create your models here.
class Users(models.Model):
    firstName = models.CharField(max_length=100)
    lastName = models.CharField(max_length=100)
    userId = models.CharField(max_length=100, null=False, blank=False)
    creationDate = models.DateTimeField()

    


class Items(models.Model):
    # user = models.ForeignKey(Users, related_name="items", on_delete = models.CASCADE, default=1)
    name = models.CharField(max_length=100)
    typeItem = models.CharField(max_length=100, blank=True)
    expirationDate = models.DateTimeField()
    user = models.ForeignKey(Users, related_name="items", on_delete = models.CASCADE, default = 1)


    # tell django what the message represntation should be like
    def __str__(self):
        # print(self.user_id)
        return str(self.user_id)

