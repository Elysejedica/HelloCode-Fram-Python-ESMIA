from django.shortcuts import render
from rest_framework import generics
from .serializers import RegisterSerializer, ProgressSerializer, UserBadgeSerializer
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.contrib.auth.models import User
from .models import Progress, UserBadge

# Create your views here.

class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        progress = Progress.objects.filter(user=user)
        badges = UserBadge.objects.filter(user=user)
        return Response({
            "username": user.username,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "email": user.email,
            "progress": ProgressSerializer(progress, many=True).data,
            "badges": UserBadgeSerializer(badges, many=True).data,
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
    serializer_class = ProgressSerializer

    def get_queryset(self):
        return Progress.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class ProgressDetailView(generics.RetrieveUpdateAPIView):
    queryset = Progress.objects.all()
    serializer_class = ProgressSerializer

class UserBadgeListView(generics.ListAPIView):
    serializer_class = UserBadgeSerializer

    def get_queryset(self):
        return UserBadge.objects.filter(user=self.request.user)

