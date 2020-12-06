from django.shortcuts import render
from django.http import HttpResponse, Http404
from .models import Users, Items
from .serializers import UsersSerializer, ItemsSerializer
from django.http import JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt
import bcrypt
import datetime

# x = datetime.datetime.now()

# print(x.strftime("%x"))

def home(request):
    items = Items.objects.all()
    # return HttpResponse('<p>Home view</p>')
    return render(request, 'home.html', {
        'items': items,
    })

def items_detail(request):
    # Returns Json list of all items
    if 'id' not in request.session:
        return JsonResponse({"message": "failure" })
        # item = Items.objects.filter(user_id = userId)
    item = Items.objects.filter(user_id = request.session['id'])
    # print("Item is : ", request.session['id'])
    serializer = ItemsSerializer(item, many=True)
    # print("serial is ", serializer.data)
    return JsonResponse(serializer.data, safe=False)
    # except Items.DoesNotExist:
    #     pass 

    # return HttpResponse(f'<p>item_detail view with id {item_id}</p>')
    # return render(request, 'items_detail.html', {
    #     'item': item,
    # })
    

@csrf_exempt
def insert_newuser(request):
    
    dataform = request.body
    data1 = dataform.decode('utf-8')
    data = json.loads(data1)
    # print("data is ", data)
    pwd = data['password']
    # print("pwd is ", pwd)
    password_hash = bcrypt.hashpw(pwd.encode(), bcrypt.gensalt()).decode()

    
    new_user = Users.objects.create(firstName=data['firstname'], lastName=data['lastname'], email=data['email'], password=password_hash )
    
    # Store the data in the session
    request.session['id'] = new_user.id
    request.session['firstName'] = new_user.firstName
    request.session['lastName'] = new_user.lastName
    request.session['email'] = new_user.email

    return JsonResponse({"id": new_user.id })

@csrf_exempt 
def check_login(request):
    # Check whether the user exists:

    dataform = request.body

    data1 = dataform.decode('utf-8')
    data = json.loads(data1)

    user =  Users.objects.filter(email=data['values']['email'])

    if user:
        logged_user = user[0]
        
        if bcrypt.checkpw(data['values']['password'].encode(), logged_user.password.encode()):
            request.session['id'] = logged_user.id
            return JsonResponse({"message": "Success" })
        else:
            return JsonResponse({"message": "Password does not match" })
    else:
        return JsonResponse({"message": "Failure" })

@csrf_exempt 
def check_signup(request):
    # Check whether the user exists:

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
    dataform = request.body
    data1 = dataform.decode('utf-8')
    data = json.loads(data1)
    print("data is : ", data)

    if 'id' not in request.session:
        return JsonResponse({"message": "failure" })
    
    Items.objects.create(name=data['values']['itemName'], typeItem=data['values']['itemType'], expirationDate=data['values']['expiryDate'], user_id=request.session['id'] )
    return JsonResponse({"message": "Success" })


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
        # item = Items.objects.filter(user_id = userId)
    user = Users.objects.filter(id = request.session['id'])
    # print("Item is : ", request.session['id'])
    serializer = UsersSerializer(user, many=True)
    # print("serial is ", serializer.data)
    return JsonResponse(serializer.data, safe=False)


@csrf_exempt 
def logout(request):
    request.session.flush()
    return JsonResponse({"message": "Logged Out successfully" })




   # print("new user : ", new_user.__dict__)
    # data = request.body.decode('utf-8')
    # data = json.loads(dataform)
    # print("data is :",dataform['firstname'])
    # Users.objects.create(firstName=FN, lastName=LN, email=EM, password=PS)
    # return JsonResponse({"message":data})

    # for key, value in data.items():
    #     print("Key is : ",key)
    #     print("Value is : ",value)



    # return HttpResponse(f'<p>item_detail view with id {item_id}</p>')
    # return render(request, 'items_detail.html', {
    #     'item': item,
    # })

    # dataform = str(request.body).strip("'<>() ").replace('\'', '\"')
    # print("dictonary is :",request.__dict__)
    # dataform = (request.body).decode('utf-8')
    # 