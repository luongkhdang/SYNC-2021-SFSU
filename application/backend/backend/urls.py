"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from rest_framework.urlpatterns import format_suffix_patterns
from todo import views

router = routers.DefaultRouter()
router.register(r'adds', views.RoomView, 'todo')
router.register(r'room_type', views.RoomType, 'todo')
router.register(r'users', views.UserView, 'todo')
router.register(r'queues', views.QueueView, 'todo')
router.register(r'votes', views.VoteView, 'todo')
router.register(r'nextsong', views.NextsongView, 'todo')
router.register(r'contact', views.ContactView, 'todo')
#router.register(r'adds', views.RoomView, 'add')


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('chat/', include('todo.urls')),
    # path('auth/', include('djoser.urls')),
    # path('auth/', include('djoser.urls.jwt')),

]
