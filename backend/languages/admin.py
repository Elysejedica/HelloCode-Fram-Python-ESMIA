from django.contrib import admin
from .models import Language, Lesson, Quiz, CodeExercise

admin.site.register(Language)
admin.site.register(Lesson)
admin.site.register(Quiz)
admin.site.register(CodeExercise)
