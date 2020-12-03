from django.shortcuts import render
from django.http import HttpResponse, Http404
from .models import Items
from .serializers import UsersSerializer, ItemsSerializer
from django.http import JsonResponse

def home(request):
    items = Items.objects.all()
    # return HttpResponse('<p>Home view</p>')
    return render(request, 'home.html', {
        'items': items,
    })

def items_detail(request, item_id):
    # Returns Json list of all items
    try:
        item = Items.objects.filter(user_id = item_id)
        print("Item is : ", item)
        serializer = ItemsSerializer(item, many=True)
    except Items.DoesNotExist:
        raise Http404('item not found')

    # return HttpResponse(f'<p>item_detail view with id {item_id}</p>')
    # return render(request, 'items_detail.html', {
    #     'item': item,
    # })
    return JsonResponse(serializer.data, safe=False)
