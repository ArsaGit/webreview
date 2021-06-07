from django.shortcuts import render, redirect
from django.views.generic.base import View
from django.contrib.auth.forms import UserCreationForm
from .forms import CreateUserForm
from django.contrib.auth import authenticate, logout, login as dj_login
from django.contrib import messages

from .models import Movie


# Create your views here.
class MovieView(View):
    def get(self, request):
        movies = Movie.objects.all()
        return render(request, 'main/movie_list.html', {'movie_list': movies})


def index(request):
    return render(request, 'main/index.html')


def set_up(request):
    return render(request, 'main/Set Up.html')


def register(request):
    form = CreateUserForm()

    if request.method == 'POST':
        form = CreateUserForm(request.POST)
        if form.is_valid():
            form.save()
            user = form.cleaned_data.get('username')
            messages.success(request, 'Account was created for ' + user)

            return redirect('login')

    context = {'form': form}
    return render(request, 'account/register.html', context)


def login(request):
    context = {}
    return render(request, 'main/login.html', context)


def loginPage(request):

    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')

        user = authenticate(request, username=username, password=password)

        if user is not None:
            dj_login(request, user)
            return redirect('home')
        else:
            messages.info(request, 'Username OR password is incorrect')

    context = {}
    return render(request, 'account/login.html', context)


def logoutUser(request):
    logout(request)
    return redirect('loginPage')


def movies(request):
    return render(request, 'main/Movies.html')


def movie_example(request):
    return render(request, 'main/The Woman in the Window.html')