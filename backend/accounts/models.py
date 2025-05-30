from django.db import models
from django.contrib.auth.models import User
from languages.models import Lesson  # Assure-toi que ce modèle existe

class Progress(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    lesson = models.ForeignKey('languages.Lesson', on_delete=models.CASCADE)
    completed = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.user.username} - {self.lesson} - {'Done' if self.completed else 'Not done'}"
