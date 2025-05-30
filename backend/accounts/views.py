from django.shortcuts import render
from rest_framework import generics
from .serializers import RegisterSerializer, ProgressSerializer
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.contrib.auth.models import User
from .models import Progress
from languages.models import Lesson

# Create your views here.

class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({
            "username": user.username,
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name,
        })

class ProgressListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        progresses = Progress.objects.filter(user=request.user)
        data = [
            {
                "lesson": p.lesson.id,
                "completed": p.completed
            }
            for p in progresses
        ]
        return Response(data)

class ProgressListCreateView(generics.ListCreateAPIView):
    queryset = Progress.objects.all()
    serializer_class = ProgressSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class ProgressDetailView(generics.RetrieveUpdateAPIView):
    queryset = Progress.objects.all()
    serializer_class = ProgressSerializer

