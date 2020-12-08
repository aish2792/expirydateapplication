from django.shortcuts import render
from django.http import HttpResponse, Http404
from .models import Users, Items
from .serializers import UsersSerializer, ItemsSerializer
from django.http import JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt
import bcrypt
import datetime
from datetime import date
import collections

x = datetime.datetime.now() # today's date

def home(request):
    items = Items.objects.all()
    return render(request, 'home.html', {
        'items': items,
    })


def items_detail(request):
    # Returns Json list of all items

    if 'id' not in request.session:
        return JsonResponse({"message": "failure" })

    item = Items.objects.filter(user_id = request.session['id'])
    serializer = ItemsSerializer(item, many=True)
    return JsonResponse(serializer.data, safe=False)


@csrf_exempt
def insert_newuser(request):
    # Insert users whenever they register 
    
    dataform = request.body
    data1 = dataform.decode('utf-8')
    data = json.loads(data1)
    pwd = data['password']
    password_hash = bcrypt.hashpw(pwd.encode(), bcrypt.gensalt()).decode() # password encryption
    
    # Insert user
    new_user = Users.objects.create(firstName=data['firstname'], lastName=data['lastname'], email=data['email'], password=password_hash )
    
    # Store the data in the session
    request.session['id'] = new_user.id
    request.session['firstName'] = new_user.firstName
    request.session['lastName'] = new_user.lastName
    request.session['email'] = new_user.email

    return JsonResponse({"id": new_user.id })


@csrf_exempt 
def check_login(request):
    # Check whether the users exist and if they do, validate against their password:

    dataform = request.body
    data1 = dataform.decode('utf-8')
    data = json.loads(data1)
    user =  Users.objects.filter(email=data['values']['email'])

    # if user exists
    if user:
        logged_user = user[0]
        # validate the password
        if bcrypt.checkpw(data['values']['password'].encode(), logged_user.password.encode()):
            request.session['id'] = logged_user.id
            return JsonResponse({"message": "Success" })
        else:
            return JsonResponse({"message": "Password does not match" })
    else:
        return JsonResponse({"message": "Failure" })


@csrf_exempt 
def check_signup(request):
    # Check whether the user already exists :

    dataform = request.body
    data1 = dataform.decode('utf-8')
    data = json.loads(data1)
    user =  Users.objects.filter(email=data['values']['email'])

    if user:
        logged_user = user[0]
        return JsonResponse({"message": "User already exists!" })
    else:
        return JsonResponse({"message": "Success" })


@csrf_exempt 
def insert_items(request):
    # Insert an item

    dataform = request.body
    data1 = dataform.decode('utf-8')
    data = json.loads(data1)

    if 'id' not in request.session:
        return JsonResponse({"message": "failure" })
    
    Items.objects.create(name=data['values']['itemName'], typeItem=data['values']['itemType'], expirationDate=data['values']['expiryDate'], user_id=request.session['id'] )
    total = Items.objects.filter(name=data['values']['itemName'], typeItem=data['values']['itemType'], expirationDate=data['values']['expiryDate'], user_id=request.session['id'] )
    serializer = ItemsSerializer(total, many=True)
    returndata = serializer.data
    
    currentitem = {
        'id':returndata[0]['id'],
        'name':returndata[0]['name'],
        'typeItem':returndata[0]['typeItem'],
        'expirationDate':returndata[0]['expirationDate'],
        'user_id':returndata[0]['user_id']

    }
    return JsonResponse(currentitem)


@csrf_exempt 
def fetch_users(request):
    # Returns Json list of all users

    try:
        user = Users.objects.all()
        serializer = UsersSerializer(user, many=True)

    except Users.DoesNotExist:
        raise Http404('Users not found')

    value = JsonResponse(serializer.data, safe=False)
    return JsonResponse(serializer.data, safe=False)


@csrf_exempt 
def fetch_user(request):
    # Returns Json of current user

    if 'id' not in request.session:
        return JsonResponse({"message": "failure" })
    user = Users.objects.filter(id = request.session['id'])
    serializer = UsersSerializer(user, many=True)
    return JsonResponse(serializer.data, safe=False)


@csrf_exempt 
def logout(request):
    # handle logout

    request.session.flush()
    return JsonResponse({"message": "Logged Out successfully" })


@csrf_exempt 
def check_expiryDate(request):
    # Find out which items are due the next day

    if 'id' not in request.session:
        return JsonResponse({"message": "failure" })
    item = Items.objects.filter(user_id = request.session['id'])

    serializer = ItemsSerializer(item, many=True)
    data = serializer.data
    due_items = []

    # Calculating the day dfference
    for i in range(len(data)):

        expirydate = data[i]['expirationDate']
        todayDate = x.strftime("%x")
        today_year = '20' + todayDate[-2:]
        today_month = todayDate[0:2]
        today_day = todayDate[3:5]

        expiry_year = '20' + expirydate[-2:]
        expiry_month = expirydate[0:2]
        expiry_day = expirydate[3:5]

        d1 = date(int(expiry_year), int(expiry_month),int(expiry_day)) # expirydate
        d2 = date(int(today_year), int(today_month),int(today_day)) # today's date
        print("d1 is : ", d1)
        print("d2 is : ", d2)
        no_days = abs(d1-d2).days
        print("no fo days is ", no_days)

        if no_days == 1:
            # console.log("item is : ", data[i]['name'])
            due_items.append(data[i]['name'])

    print(JsonResponse({"itemsDue": due_items }))
    return JsonResponse({"itemsDue": due_items })


@csrf_exempt 
def remove_Item(request):
    # Remove an item from the list

    if 'id' not in request.session:
        return JsonResponse({"message": "failure" })
    
    dataform = request.body
    data1 = dataform.decode('utf-8')
    data = json.loads(data1)
    
    Items.objects.filter(user_id = request.session['id'], id= data['itemid']).delete()
    return JsonResponse({"message": "success" })

@csrf_exempt 
def delete_account(request):
    # handles deletion of user and the related data
    
    if 'id' not in request.session:
        return JsonResponse({"message": "failure" })
    
    Users.objects.filter(id = request.session['id']).delete()
    for item in Items.objects.filter(user_id = request.session['id']):
        item.delete()

    request.session.flush()

    return JsonResponse({"message": "success" })