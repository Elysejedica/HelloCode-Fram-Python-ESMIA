from rest_framework import viewsets, permissions, status, generics
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth.models import User
from django.utils import timezone
import requests
import json

from .models import (
    Language, Lesson, Quiz, CodeExercise, UserProgress,
    UserQuizAttempt, UserCodeSubmission, Badge, UserBadge
)
from .serializers import (
    UserSerializer, RegistrationSerializer, LanguageSerializer, LanguageDetailSerializer, 
    LessonSerializer, QuizSerializer, CodeExerciseSerializer, UserProgressSerializer,
    QuizAttemptSerializer, CodeSubmissionSerializer, BadgeSerializer, UserBadgeSerializer,
    UserProfileSerializer
)

class IsAdminOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow admin users to edit.
    """
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user and request.user.is_staff

class RegistrationView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegistrationSerializer
    permission_classes = [permissions.AllowAny]

class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAdminUser]

class UserProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_object(self):
        return self.request.user

class LanguageViewSet(viewsets.ModelViewSet):
    queryset = Language.objects.all()
    permission_classes = [IsAdminOrReadOnly]
    
    def get_serializer_class(self):
        if self.action == 'retrieve':
            return LanguageDetailSerializer
        return LanguageSerializer

class LessonViewSet(viewsets.ModelViewSet):
    serializer_class = LessonSerializer
    permission_classes = [IsAdminOrReadOnly]
    
    def get_queryset(self):
        queryset = Lesson.objects.all()
        language_slug = self.request.query_params.get('language', None)
        if language_slug:
            queryset = queryset.filter(language__slug=language_slug)
        return queryset

class UserProgressViewSet(viewsets.ModelViewSet):
    serializer_class = UserProgressSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return UserProgress.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    
    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        
        if 'completed' in request.data and request.data['completed'] and not instance.completed:
            serializer.save(completed_at=timezone.now())
        else:
            serializer.save()
        
        return Response(serializer.data)

class QuizAttemptView(generics.CreateAPIView):
    serializer_class = QuizAttemptSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class CodeSubmissionView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request):
        serializer = CodeSubmissionSerializer(data=request.data)
        if serializer.is_valid():
            exercise = serializer.validated_data['exercise']
            code = serializer.validated_data['code']
            
            # Call Judge0 API to execute the code
            # This is a simplified example - in a real app, you'd need more robust handling
            try:
                # For this demo, we'll just simulate the response
                # In a real application, you would call the Judge0 API
                output = "Output from code execution"
                expected = exercise.expected_output.strip()
                is_correct = output.strip() == expected
                
                submission = serializer.save(
                    user=request.user,
                    output=output,
                    is_correct=is_correct
                )
                
                return Response({
                    'id': submission.id,
                    'output': output,
                    'is_correct': is_correct
                })
                
            except Exception as e:
                return Response({
                    'error': str(e)
                }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class BadgeViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Badge.objects.all()
    serializer_class = BadgeSerializer
    permission_classes = [permissions.IsAuthenticated]

class UserBadgeViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = UserBadgeSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return UserBadge.objects.filter(user=self.request.user)