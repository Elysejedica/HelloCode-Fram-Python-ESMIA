from rest_framework import serializers
from accounts.models import User
from .models import (
    Language, Lesson, Quiz, CodeExercise, UserProgress,
    UserQuizAttempt, UserCodeSubmission, Badge, UserBadge
)

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name')
        read_only_fields = ('id',)

class RegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'first_name', 'last_name')
    
    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', '')
        )
        return user

class LanguageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Language
        fields = ('id', 'name', 'slug', 'description', 'icon')

class QuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quiz
        fields = ('id', 'question', 'choices')
        # Note: correct_answer is not included to avoid giving away the answer

class CodeExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = CodeExercise
        fields = ('id', 'title', 'instruction', 'initial_code')
        # expected_output is excluded to avoid giving away the answer

class LessonSerializer(serializers.ModelSerializer):
    quizzes = QuizSerializer(many=True, read_only=True)
    exercises = CodeExerciseSerializer(many=True, read_only=True)
    
    class Meta:
        model = Lesson
        fields = ('id', 'title', 'slug', 'content', 'level', 'order', 'quizzes', 'exercises')

class LanguageDetailSerializer(serializers.ModelSerializer):
    lessons = LessonSerializer(many=True, read_only=True)
    
    class Meta:
        model = Language
        fields = ('id', 'name', 'slug', 'description', 'icon', 'lessons')

class UserProgressSerializer(serializers.ModelSerializer):
    lesson_title = serializers.CharField(source='lesson.title', read_only=True)
    
    class Meta:
        model = UserProgress
        fields = ('id', 'lesson', 'lesson_title', 'completed', 'completed_at')
        read_only_fields = ('id', 'completed_at')

class QuizAttemptSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserQuizAttempt
        fields = ('id', 'quiz', 'answer', 'is_correct', 'attempted_at')
        read_only_fields = ('id', 'is_correct', 'attempted_at')
    
    def validate(self, data):
        quiz = data['quiz']
        answer = data['answer']
        
        # Validate the answer
        is_correct = answer == quiz.correct_answer
        data['is_correct'] = is_correct
        
        return data

class CodeSubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserCodeSubmission
        fields = ('id', 'exercise', 'code', 'output', 'is_correct', 'submitted_at')
        read_only_fields = ('id', 'output', 'is_correct', 'submitted_at')

class BadgeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Badge
        fields = ('id', 'name', 'description', 'icon')

class UserBadgeSerializer(serializers.ModelSerializer):
    badge_details = BadgeSerializer(source='badge', read_only=True)
    
    class Meta:
        model = UserBadge
        fields = ('id', 'badge', 'badge_details', 'earned_at')
        read_only_fields = ('id', 'earned_at')

class UserProfileSerializer(serializers.ModelSerializer):
    progress = UserProgressSerializer(many=True, read_only=True)
    badges = UserBadgeSerializer(many=True, read_only=True)
    
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'progress', 'badges')
        read_only_fields = ('id', 'progress', 'badges')