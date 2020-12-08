
from django.contrib import admin
from django.urls import path
from expirydate import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.home),
    path('listusers', views.fetch_users), # list of all users
    path('fetchuser', views.fetch_user), # current user data
    path('users', views.insert_newuser), # insert a new user when users register
    path('checklogin', views.check_login), # check whether the user exists
    path('checksignup', views.check_signup), # check whether user account exists
    path('insertItems', views.insert_items), # insert items when users add items
    path('itemsList/', views.items_detail), # lists the items pertaining to the current logged in user
    path('checkExpiryDates', views.check_expiryDate), # Validate the expiry date and return the items whose due date is the next day
    path('removeItemFromMyList', views.remove_Item), # Deletes an item whenever users clicks on delete icon of a particular item
    path('logout', views.logout), # handles log out and removing user from the session
    path('deleteAccount', views.delete_account), # handles deletion of user account and all the relevant date pertaining to that user

]
