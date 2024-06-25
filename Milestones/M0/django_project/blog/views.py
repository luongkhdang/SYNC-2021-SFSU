from django.shortcuts import render
from django.http import HttpResponse

def home(request):
    return render(request, 'blog/home.html')

def about(request):
    return render(request, 'blog/about.html')

def vishakha(request):
    return render(request, 'blog/vishakha.html')

def rebecca(request):
    return render(request, 'blog/rebecca.html')

def luong(request):
    return render(request, 'blog/luong.html')

def bryan(request):
    return render(request, 'blog/bryan.html')

def ashwini(request):
    return render(request, 'blog/ashwini.html')

def malcolm(request):
    return render(request, 'blog/malcolm.html')