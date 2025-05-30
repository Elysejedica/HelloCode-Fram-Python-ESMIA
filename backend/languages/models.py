from django.db import models

# Create your models here.

class Language(models.Model):
    name = models.CharField(max_length=50)
    slug = models.SlugField(unique=True)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name

class Lesson(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField(default="")
    language = models.ForeignKey(Language, on_delete=models.CASCADE, related_name='lessons')
    level = models.IntegerField()
    order = models.IntegerField(default=0)

    def __str__(self):
        return self.title

class Quiz(models.Model):
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE, related_name='quizzes')
    question = models.TextField()
    choices = models.JSONField()
    correct_answer = models.CharField(max_length=1)

class CodeExercise(models.Model):
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE, related_name='exercises')
    instruction = models.TextField()
    initial_code = models.TextField()
    expected_output = models.TextField()
