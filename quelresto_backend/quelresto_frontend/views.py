from django.shortcuts import render


def index(request):
    context = {}
    return render(request, 'quelresto_frontend/index.html', context)


def tirage(request, uuid):
    context = {"tid": uuid}
    return render(request, 'quelresto_frontend/tirage.html', context)