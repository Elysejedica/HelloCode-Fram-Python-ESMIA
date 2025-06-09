from django.contrib import admin
from .models import Language, Lesson, Quiz, CodeExercise

class LessonAdmin(admin.ModelAdmin):
    list_display = ('title', 'language', 'level')
    search_fields = ('title',)

admin.site.register(Language)
admin.site.register(Lesson, LessonAdmin)
admin.site.register(Quiz)
admin.site.register(CodeExercise)
