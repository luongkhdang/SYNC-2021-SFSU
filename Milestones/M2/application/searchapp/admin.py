from django.contrib import admin

from .models import Rooms

class RoomAdmin(admin.ModelAdmin):
    list_display = ("room_id", "room_name", "genre")

admin.site.register(Rooms, RoomAdmin)