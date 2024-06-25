from django import forms
from .models import Rooms

class AddRoomsForm(forms.ModelForm):
    class Meta:
        model= Rooms
        fields= ["room_id", "room_name", "genre"]