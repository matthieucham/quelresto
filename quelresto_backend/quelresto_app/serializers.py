from rest_framework import serializers

from quelresto_app.models import RestoModel, TirageModel, SelectionModel, ParticipantModel


class RestoSerializer(serializers.ModelSerializer):
    class Meta:
        model = RestoModel
        fields = ('id', 'nom')


class ParticipantSerializer(serializers.ModelSerializer):
    uuid = serializers.UUIDField(read_only=True)

    def create(self, validated_data):
        participant = ParticipantModel()
        participant.nom = validated_data['nom']
        participant.save()
        return participant

    class Meta:
        model = ParticipantModel
        fields = ('uuid', 'nom',)


class MesSelectionsListSerializer(serializers.ListSerializer):
    def to_representation(self, data):
        data = data.filter(participant=self.context['request'].participant)
        return super(MesSelectionsListSerializer, self).to_representation(data)


class SelectionSerializer(serializers.ModelSerializer):
    nom = serializers.CharField()

    class Meta:
        model = SelectionModel
        fields = ('nom',)
        list_serializer_class = MesSelectionsListSerializer


class TirageEnCoursSerializer(serializers.ModelSerializer):
    etat = serializers.ReadOnlyField()
    master = serializers.ReadOnlyField(source='master.nom')
    master_uuid = serializers.ReadOnlyField(source='master.uuid')
    participants = serializers.SerializerMethodField()
    selections = SelectionSerializer(many=True)
    uuid = serializers.UUIDField(read_only=True)

    def get_participants(self, value):
        votants = SelectionModel.objects.filter(tirage=value).values_list('participant__nom', flat=True)
        # Grace au set(), on supprime les doublons
        return set(votants)

    def create(self, validated_data):
        tirage = TirageModel()
        tirage.master = validated_data['master']
        tirage.save()
        return tirage

    def update(self, instance, validated_data):
        request = self.context['request']
        # Effacer toutes les sélections préexistants pour cet utilisateur
        SelectionModel.objects.filter(tirage=instance, participant=request.participant).delete()
        # Create selection instances that are in the request
        for item in validated_data['selections']:
            selection = SelectionModel(nom=item['nom'], participant=request.participant, tirage=instance)
            selection.save()
        return instance

    class Meta:
        model = TirageModel
        fields = ('uuid', 'etat', 'master', 'master_uuid', 'participants', 'selections')


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
            if sel.participant.nom not in by_user:
                by_user[sel.participant.nom] = []
            by_user[sel.participant.nom].append(sel.nom)
            if sel.nom not in by_nom:
                by_nom[sel.nom] = 0
            by_nom[sel.nom] += 1
        stats_obj = {'selections': by_user, 'votes': by_nom, 'total': total}
        return stats_obj


class TirageTermineSerializer(serializers.ModelSerializer):
    uuid = serializers.UUIDField(read_only=True)
    choix = serializers.CharField(read_only=True)
    statistiques = StatistiquesField(read_only=True)

    class Meta:
        model = TirageModel
        fields = ('uuid', 'etat', 'choix', 'statistiques')



