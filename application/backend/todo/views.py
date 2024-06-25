from django.shortcuts import render
from rest_framework import viewsets
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend
from django.views.generic import TemplateView, ListView
from rest_framework import generics
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import TodoSerializer
from .serializers import RoomsSerializer
from .serializers import UsersSerializer
from .serializers import QueuesSerializer
from .serializers import VotesSerializer
from .serializers import NextsongSerializer
from .serializers import ContactSerializer

from .models import Todo
from .models import Rooms
from .models import Users
from .models import Queue
from .models import Vote
from .models import Nextsong
from .models import Contact


# Create your views here.

class TodoView(viewsets.ModelViewSet):
    serializer_class = TodoSerializer
    queryset = Todo.objects.all()

class RoomView(viewsets.ModelViewSet):
#    queryset = Rooms.objects.filter(roomType='False')
    search_fields = ['room_name']
    filter_backends = (filters.SearchFilter,)
    queryset = Rooms.objects.all()
    serializer_class = RoomsSerializer

class RoomType(viewsets.ModelViewSet):
    queryset = Rooms.objects.filter(roomType='False')
    serializer_class = RoomsSerializer

class UserView(viewsets.ModelViewSet):
    serializer_class = UsersSerializer
    queryset = Users.objects.all()

class QueueView(viewsets.ModelViewSet):
    search_fields = ['room_id', 'song_id']
    filter_backends = (filters.SearchFilter,)
    serializer_class = QueuesSerializer
    queryset = Queue.objects.all()

class VoteView(viewsets.ModelViewSet):
    search_fields = ['room_id', 'user_id', 'song_id']
    filter_backends = (filters.SearchFilter,)
    serializer_class = VotesSerializer
    queryset = Vote.objects.all()

class NextsongView(viewsets.ModelViewSet):
    search_fields = ['time_submitted']
    filter_backends = (filters.SearchFilter,)
    serializer_class = NextsongSerializer
    queryset = Nextsong.objects.all()

class ContactView(viewsets.ModelViewSet):
    search_fields = ['email']
    filter_backends = (filters.SearchFilter,)
    serializer_class = ContactSerializer
    queryset = Contact.objects.all()


def submitpage(request):
    data = request.POST.get('data')
   

    if 'roomName' in request.POST:
        name = request.POST['roomName']
    else:
        name = False

    if 'roomGenre' in request.POST:
        genre = request.POST['roomGenre']
    else:
        genre = False
    ins = Rooms(room_name=name, genre=genre)
    ins.save()
    print("Saved to db")

    context = {'data': data}
    return (request, context)

def index(request):
    return render(request, 'chat/index1.html')


def room(request, room_name):
    return render(request, 'chat/room.html', {
        'room_name': room_name
    })
