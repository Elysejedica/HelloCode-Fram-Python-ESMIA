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
import sys
import io
import subprocess

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
    permission_classes = [IsAuthenticated]  # <-- AJOUTE CETTE LIGNE

    def get_queryset(self):
        return Progress.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class ProgressDetailView(generics.RetrieveUpdateAPIView):
    queryset = Progress.objects.all()
    serializer_class = ProgressSerializer
    permission_classes = [IsAuthenticated]  # <-- AJOUTE CETTE LIGNE

class UserBadgeListView(generics.ListAPIView):
    serializer_class = UserBadgeSerializer

    def get_queryset(self):
        return UserBadge.objects.filter(user=self.request.user)

class RunCodeView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        code = request.data.get('code', '')
        language = request.data.get('language', 'python')
        output = ''

        try:
            if language == 'python':
                old_stdout = sys.stdout
                redirected_output = sys.stdout = io.StringIO()
                safe_builtins = {
                    'print': print,
                    'range': range,
                    'len': len,
                    'int': int,
                    'float': float,
                    'str': str,
                    'bool': bool,
                    'enumerate': enumerate,
                    'abs': abs,
                    # Ajoute d'autres fonctions si besoin
                }
                exec(code, {'__builtins__': safe_builtins})
                sys.stdout = old_stdout
                output = redirected_output.getvalue()
            elif language == 'javascript':
                # Nécessite Node.js installé sur le serveur
                process = subprocess.Popen(
                    ['node', '-e', code],
                    stdout=subprocess.PIPE,
                    stderr=subprocess.PIPE
                )
                out, err = process.communicate(timeout=5)
                output = out.decode() + err.decode()
            else:
                output = "Langage non supporté."
        except Exception as e:
            output = f"Erreur : {e}"
        return Response({'output': output})

