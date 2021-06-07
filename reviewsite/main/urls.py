from django.urls import path

from . import views


urlpatterns = [
    path('', views.index),
    path('login', views.login),
    path('set-up', views.authorization),
    path('movies', views.movies),
    path('movies/the-woman-in-the-window', views.movie_example),
]