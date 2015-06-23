import random
from rest_framework import generics, viewsets
from rest_framework.decorators import detail_route
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response

from quelresto_app import models, serializers, permissions

# Create your views here.


class RestoList(generics.ListAPIView):
    """
    Liste les restos
    """
    queryset = models.RestoModel.objects.all()
    serializer_class = serializers.RestoSerializer


class TirageInit(generics.CreateAPIView):
    """
    Initialise un tirage
    """
    queryset = models.TirageModel.objects.all()
    serializer_class = serializers.TirageEnCoursSerializer

    def perform_create(self, serializer):
        serializer.save(master=self.request.user)


class TirageDetail(viewsets.ModelViewSet):
    """
    Donne les détails du tirage en cours.
    """
    queryset = models.TirageModel.objects.all()
    permission_classes = [permissions.IsMasterOrNoShuffle, IsAuthenticatedOrReadOnly]

    def get_serializer_class(self):
        pk = self.kwargs.get('pk')
        # Selon l'état du tirage, on serialise différemment
        tirage = models.TirageModel.objects.get(pk=pk)
        if tirage.etat == 'OPEN':
            return serializers.TirageEnCoursSerializer
        elif tirage.etat == 'CLOSE':
            return serializers.TirageTermineSerializer
        else:
            raise RuntimeError('Le tirage %s est dans un état inconnu.' % pk)

    @detail_route(methods=['POST'])
    def shuffle(self, request, pk=None):
        tirage = models.TirageModel.objects.get(pk=pk)
        self.check_object_permissions(request, tirage)
        assert tirage.etat == 'OPEN', 'Le tirage a déjà eu lieu'
        # Tirer au sort parmi tous les choix
        # cela nécessite bien sûr que des choix ait été enregistrés !
        selections = models.SelectionModel.objects.filter(tirage=tirage).values_list('nom', flat=True)
        assert len(selections) > 0, 'Pas de sélections enregistrées dans ce tirage'
        choix = random.choice(selections)
        tirage.terminer(choix)
        serializer = serializers.TirageTermineSerializer(tirage)
        return Response(serializer.data)