from django.db import models


# Create your models here.

class Todo(models.Model):
    title = models.CharField(max_length=120)
    description = models.TextField()
    completed = models.BooleanField(default=False)

    def _str_(self):
        return self.title

class Users(models.Model):
    user_id = models.CharField(primary_key=True, max_length=255)
    display_name = models.CharField(max_length=255)
    profile_pic = models.CharField(max_length=1000)
    admin_status = models.BooleanField(default=False)
    ban_status = models.BooleanField(default=False)
    ban_comments = models.CharField(max_length=4195, null=True)


class Rooms(models.Model):
    room_id = models.CharField(primary_key=True, max_length=20, default=True)
    room_name = models.CharField(max_length=255, unique=True)
    genre = models.CharField(max_length=255)
    roomImageUrl = models.CharField(max_length=255, null=True)
    roomType = models.BooleanField(default=True)
    room_song_number = models.CharField(max_length=255, default=True)
    population = models.CharField(max_length=20, null=True)
    current_track_id = models.CharField(max_length=255, default=True)
    current_song_track_url = models.CharField(max_length=255, default=True)
    current_song_end_time = models.CharField(max_length=255, default=True)
    current_song_start_time = models.CharField(max_length=255, default=True) 
    current_song_name = models.CharField(max_length=255, default=True)
    current_song_artist = models.CharField(max_length=255, default=True)
    current_song_duration = models.CharField(max_length=255, default=True)

    def _str_(self):        
        return self.room_name

class Room_list(models.Model):
    #room_name = models.CharField(Rooms, on_delete=models.CASCADE)
    room_list_title = models.CharField(max_length=255)

class Vote(models.Model):
    vote_id = models.CharField(primary_key=True, max_length=255, default=True)
    room_id = models.CharField(max_length=255, default=True)
    user_id = models.CharField(max_length=255, default=True)
    song_id = models.CharField(max_length=255, default=True)
    #room_id = models.ForeignKey(Rooms, on_delete=models.CASCADE)

class Participants(models.Model):
    #room_id = models.ForeignKey(Rooms, on_delete=models.CASCADE)
    user_id = models.CharField(max_length=255)

class Queue(models.Model):
    #room_id = models.ForeignKey(Rooms, on_delete=models.CASCADE)
    queue_item_id = models.CharField(primary_key=True, max_length=255)
    queue_id = models.CharField(max_length=255, default=True)
    room_id = models.CharField(max_length=255, default=True)
    song_id = models.CharField(max_length=255, default=True)
    song_name = models.CharField(max_length=255, default=True)
    song_artist = models.CharField(max_length=255, default=True)
    song_track_url = models.CharField(max_length=255, default=True)
    small_song_image_url = models.CharField(max_length=255, default=True)
    large_song_image_url = models.CharField(max_length=255, default=True)
    song_duration = models.CharField(max_length=255, default=True)
    time_added_to_queue = models.CharField(max_length=255, default=True)


class Nextsong(models.Model):
    room_id = models.CharField(max_length=255, default=True)
    queue_item_id = models.CharField(max_length=255, default=True)
    time_submitted = models.CharField(primary_key=True, max_length=255)
    room_song_number = models.CharField(max_length=255, default=True)
    song_track_id = models.CharField(max_length=255, default=True)
    song_name = models.CharField(max_length=255, default=True)
    song_artist = models.CharField(max_length=255, default=True)
    song_track_url = models.CharField(max_length=255, default=True)
    small_song_image_url = models.CharField(max_length=255, default=True)
    large_song_image_url = models.CharField(max_length=255, default=True)
    song_duration = models.CharField(max_length=255, default=True)

class Contact(models.Model):
    email = models.CharField(max_length=255, default=True)
    message = models.CharField(max_length=255, default=True)  

    
  

