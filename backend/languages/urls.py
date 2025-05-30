from django.urls import path
from .views import LanguageListView, LanguageDetailView, LessonDetailView

urlpatterns = [
    path('languages/', LanguageListView.as_view(), name='language-list'),
    path('languages/<slug:slug>/', LanguageDetailView.as_view(), name='language-detail'),
    path('lessons/<int:id>/', LessonDetailView.as_view(), name='lesson-detail'),
]