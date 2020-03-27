from django.shortcuts import get_object_or_404, render
from quelresto_app.models import TirageModel


def index(request):
    context = {}
    return render(request, 'quelresto_frontend/index.html', context)


def tirage(request, code):
    context = {"tid": code}
    ti = get_object_or_404(TirageModel, code=code)
    if ti.etat == 'OPEN':
        return render(request, 'quelresto_frontend/tirage.html', context)
    else:
        return render(request, 'quelresto_frontend/resultat.html', context)


def resultat(request, code):
    context = {"tid": code}
    ti = get_object_or_404(TirageModel, code=code)
    if ti.etat == 'OPEN':
        return render(request, 'quelresto_frontend/tirage.html', context)
    else:
        return render(request, 'quelresto_frontend/resultat.html', context)
