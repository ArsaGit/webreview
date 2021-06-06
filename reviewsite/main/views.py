from django.shortcuts import render
from django.views.generic.base import View

from .models import Movie


# Create your views here.
class MovieView(View):
    def get(self, request):
        movies = Movie.objects.all()
        return render(request, 'main/movie_list.html', {'movie_list': movies})


def index(request):
    return render(request, 'main/index.html')
