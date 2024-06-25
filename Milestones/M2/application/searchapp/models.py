from django.db import models

# Create your models here.
class Rooms(models.Model):
    room_id = models.CharField(max_length=20)
    room_name = models.CharField(max_length=255)
    genre = models.CharField(max_length=255)

    class Meta:
      verbose_name_plural = "rooms"

    def __str__(self):
        return self.room_name