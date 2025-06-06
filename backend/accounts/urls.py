from django.urls import path
from .views import RegisterView, ProfileView, ProgressListCreateView, ProgressDetailView, UserBadgeListView, RunCodeView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', TokenObtainPairView.as_view(), name='login'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('profile/', ProfileView.as_view(), name='profile'),
    path('progress/', ProgressListCreateView.as_view(), name='progress-list-create'),
    path('progress/<int:pk>/', ProgressDetailView.as_view(), name='progress-detail'),
    path('user-badges/', UserBadgeListView.as_view(), name='user-badges'),
    path('run-code/', RunCodeView.as_view(), name='run-code'),
]