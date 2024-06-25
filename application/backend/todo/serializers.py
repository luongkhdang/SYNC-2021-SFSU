

from rest_framework import serializers
from .models import Todo
from .models import Rooms
from .models import Users
from .models import Queue
from .models import Vote
from .models import Nextsong
from .models import Contact





class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ('id', 'title', 'description')

class RoomsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Rooms
        fields = ('room_id','room_name', 'genre' ,'roomImageUrl','roomType', 'room_song_number','population', 'current_track_id', 'current_song_track_url', 'current_song_end_time', 'current_song_start_time', 'current_song_name', 'current_song_artist', 'current_song_duration')
class UsersSerializer(serializers.ModelSerializer):

    class Meta:
        model = Users
        fields = ('user_id', 'display_name', 'profile_pic', 'admin_status', 'ban_status', 'ban_comments')

class QueuesSerializer(serializers.ModelSerializer):

    class Meta:
        model = Queue
        fields = ('queue_item_id', 'room_id', 'song_id', 'song_name', 'song_artist', 'song_track_url', 'small_song_image_url', 'large_song_image_url', 'song_duration', 'time_added_to_queue')

class VotesSerializer(serializers.ModelSerializer):

    class Meta:
        model = Vote
        fields = ('vote_id', 'room_id', 'user_id', 'song_id')

class NextsongSerializer(serializers.ModelSerializer):

    class Meta:
        model = Nextsong
        fields = ('time_submitted', 'queue_item_id', 'room_id', 'room_song_number', 'song_track_id', 'song_name', 'song_artist', 'song_track_url', 'small_song_image_url', 'large_song_image_url', 'song_duration')

class ContactSerializer(serializers.ModelSerializer):

    class Meta:
        model = Contact
        fields = ('email', 'message')

