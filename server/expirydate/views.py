from django.shortcuts import render
from django.http import HttpResponse, Http404
from .models import Users, Items
from .serializers import UsersSerializer, ItemsSerializer
from django.http import JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt

def home(request):
    items = Items.objects.all()
    # return HttpResponse('<p>Home view</p>')
    return render(request, 'home.html', {
        'items': items,
    })

def items_detail(request, userId):
    # Returns Json list of all items
    try:
        item = Items.objects.filter(user_id = userId)
        # print("Item is : ", item)
        serializer = ItemsSerializer(item, many=True)
    except Items.DoesNotExist:
        raise Http404('item not found')

    # return HttpResponse(f'<p>item_detail view with id {item_id}</p>')
    # return render(request, 'items_detail.html', {
    #     'item': item,
    # })
    return JsonResponse(serializer.data, safe=False)

@csrf_exempt
def insert_newuser(request):
    # dataform = str(request.body).strip("'<>() ").replace('\'', '\"')
    # print("dictonary is :",request.__dict__)
    # dataform = (request.body).decode('utf-8')
    # 
    dataform = request.body
    # print("dataform is :",type(dataform))
    data1 = dataform.decode('utf-8')
    data = json.loads(data1)
    print("data is : ",data['values']['firstname'])
    # print(type(data))

    # FN = data['firstname']
    # LN = data['lastname']
    # EM = data['email']
    # PS = data['password']
    
    Users.objects.create(firstName=data['values']['firstname'], lastName=data['values']['lastname'], email=data['values']['email'], password=data['values']['password'])
    
    # data = request.body.decode('utf-8')
    # data = json.loads(dataform)
    # print("data is :",dataform['firstname'])
    # Users.objects.create(firstName=FN, lastName=LN, email=EM, password=PS)
    # return JsonResponse({"message":data})

    # for key, value in data.items():
    #     print("Key is : ",key)
    #     print("Value is : ",value)
    return JsonResponse({"message": "success" })

    # {"values":
    # {"firstname":"Brad","lastname":"Feldman","email":"Test@test.com","password":"Test1234"}
    # }
    
    
