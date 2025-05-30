from django.shortcuts import render
from rest_framework import generics
from .models import Language, Lesson
from .serializers import LanguageDetailSerializer, LessonSerializer

# Create your views here.

class LanguageDetailView(generics.RetrieveAPIView):
    queryset = Language.objects.all()
    serializer_class = LanguageDetailSerializer
    lookup_field = 'slug'

class LanguageListView(generics.ListAPIView):
    queryset = Language.objects.all()
    serializer_class = LanguageDetailSerializer

class LessonDetailView(generics.RetrieveAPIView):
    queryset = Lesson.objects.all()
    serializer_class = LessonSerializer
    lookup_field = 'id'
