from django.urls import path

from . import views


urlpatterns = [
    path('', views.index, name='home'),
    path('login', views.login, name='login'),
    path('set-up', views.set_up, name='set up'),
    path('movies', views.movies, name='movies'),
    path('movies/the-woman-in-the-window', views.movie_example, name='the-woman-in-the-window'),
    path('register', views.register, name='register'),
    path('loginPage', views.loginPage, name='loginPage'),
    path('logout', views.logoutUser, name='logout'),
]