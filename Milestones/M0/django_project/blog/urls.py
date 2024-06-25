from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='blog-home'),
    path('vishakha', views.vishakha, name='blog-vishakha'),
    path('rebecca', views.rebecca, name='blog-rebecca'),
    path('luong', views.luong, name='blog-luong'),
    path('bryan', views.bryan, name='blog-bryan'),
    path('ashwini', views.ashwini, name='blog-ashwini'),
    path('malcolm', views.malcolm, name='blog-malcolm'),
]
