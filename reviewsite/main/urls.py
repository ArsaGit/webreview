from django.urls import path

from . import views


urlpatterns = [
    path('', views.MovieView.as_view()),
    path('index', views.index),
]