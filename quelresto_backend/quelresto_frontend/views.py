from django.shortcuts import render


def index(request):
    context = {}
    return render(request, 'quelresto_frontend/index.html', context)