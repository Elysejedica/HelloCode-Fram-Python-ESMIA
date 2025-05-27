from django.contrib import admin
from .models import (
    Language, Lesson, Quiz, CodeExercise, UserProgress,
    UserQuizAttempt, UserCodeSubmission, Badge, UserBadge
)

@admin.register(Language)
class LanguageAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug')
    prepopulated_fields = {'slug': ('name',)}

class QuizInline(admin.TabularInline):
    model = Quiz
    extra = 1

class CodeExerciseInline(admin.TabularInline):
    model = CodeExercise
    extra = 1

@admin.register(Lesson)
class LessonAdmin(admin.ModelAdmin):
    list_display = ('title', 'language', 'level', 'order')
    list_filter = ('language', 'level')
    search_fields = ('title', 'content')
    prepopulated_fields = {'slug': ('title',)}
    inlines = [QuizInline, CodeExerciseInline]

@admin.register(Quiz)
class QuizAdmin(admin.ModelAdmin):
    list_display = ('id', 'lesson', 'question', 'correct_answer')
    list_filter = ('lesson__language',)

@admin.register(CodeExercise)
class CodeExerciseAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'lesson')
    list_filter = ('lesson__language',)

@admin.register(UserProgress)
class UserProgressAdmin(admin.ModelAdmin):
    list_display = ('user', 'lesson', 'completed', 'completed_at')
    list_filter = ('completed', 'lesson__language')

@admin.register(UserQuizAttempt)
class UserQuizAttemptAdmin(admin.ModelAdmin):
    list_display = ('user', 'quiz', 'answer', 'is_correct', 'attempted_at')
    list_filter = ('is_correct', 'quiz__lesson__language')

@admin.register(UserCodeSubmission)
class UserCodeSubmissionAdmin(admin.ModelAdmin):
    list_display = ('user', 'exercise', 'is_correct', 'submitted_at')
    list_filter = ('is_correct', 'exercise__lesson__language')

@admin.register(Badge)
class BadgeAdmin(admin.ModelAdmin):
    list_display = ('name', 'description')

@admin.register(UserBadge)
class UserBadgeAdmin(admin.ModelAdmin):
    list_display = ('user', 'badge', 'earned_at')