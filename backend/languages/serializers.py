from rest_framework import serializers
from .models import Language, Lesson, Quiz, CodeExercise

class QuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quiz
        fields = ['id', 'question', 'choices', 'correct_answer']

class CodeExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = CodeExercise
        fields = ['id', 'instruction', 'initial_code', 'expected_output']

class LessonSerializer(serializers.ModelSerializer):
    quizzes = QuizSerializer(many=True, read_only=True)
    exercises = CodeExerciseSerializer(many=True, read_only=True)
    language = serializers.SlugRelatedField(slug_field='slug', read_only=True)  # Ajoute cette ligne

    class Meta:
        model = Lesson
        fields = ['id', 'title', 'content', 'language', 'level', 'order', 'quizzes', 'exercises']

class LanguageDetailSerializer(serializers.ModelSerializer):
    lessons = LessonSerializer(many=True, read_only=True)

    class Meta:
        model = Language
        fields = ['id', 'name', 'slug', 'description', 'lessons']