from rest_framework import serializers

from quelresto_app.models import RestoModel, TirageModel, SelectionModel


class RestoSerializer(serializers.ModelSerializer):
    class Meta:
        model = RestoModel
        fields = ('id', 'nom')


class MesSelectionsListSerializer(serializers.ListSerializer):
    def to_representation(self, data):
        user = self.context['request'].user
        if user.is_anonymous():
            return []
        else:
            data = data.filter(user=self.context['request'].user)
        return super(MesSelectionsListSerializer, self).to_representation(data)


class SelectionSerializer(serializers.ModelSerializer):
    nom = serializers.CharField()

    class Meta:
        model = SelectionModel
        fields = ('nom',)
        list_serializer_class = MesSelectionsListSerializer


class TirageEnCoursSerializer(serializers.ModelSerializer):
    etat = serializers.ReadOnlyField()
    master = serializers.ReadOnlyField(source='master.username')
    participants = serializers.SerializerMethodField()
    selections = SelectionSerializer(many=True)

    def get_participants(self, value):
        votants = SelectionModel.objects.filter(tirage=value).values_list('user__username', flat=True)
        # Grace au set(), on supprime les doublons
        return set(votants)

    def create(self, validated_data):
        request = self.context['request']
        tirage = TirageModel()
        tirage.master = request.user
        tirage.save()
        return tirage

    def update(self, instance, validated_data):
        request = self.context['request']
        # Effacer toutes les sélections préexistants pour cet utilisateur
        SelectionModel.objects.filter(tirage=instance, user=request.user).delete()
        # Create selection instances that are in the request
        for item in validated_data['selections']:
            selection = SelectionModel(nom=item['nom'], user=request.user, tirage=instance)
            selection.save()
        return instance

    class Meta:
        model = TirageModel
        fields = ('id', 'etat', 'master', 'participants', 'selections')


class StatistiquesField(serializers.Field):
    def get_attribute(self, obj):
        return obj

    def to_representation(self, tirage):
        selections = SelectionModel.objects.filter(tirage=tirage)
        by_user = {}
        by_nom = {}
        total = 0
        for sel in selections:
            total += 1
            if sel.user.username not in by_user:
                by_user[sel.user.username] = []
            by_user[sel.user.username].append(sel.nom)
            if sel.nom not in by_nom:
                by_nom[sel.nom] = 0
            by_nom[sel.nom] += 1
        stats_obj = {'selections': by_user, 'votes': by_nom, 'total': total}
        return stats_obj


class TirageTermineSerializer(serializers.ModelSerializer):
    choix = serializers.CharField(read_only=True)
    statistiques = StatistiquesField(read_only=True)

    class Meta:
        model = TirageModel
        fields = ('id', 'etat', 'choix', 'statistiques')



