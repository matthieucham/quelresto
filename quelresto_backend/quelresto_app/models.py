from django.db import models
from django.utils.crypto import get_random_string
import uuid


# Create your models here.
class RestoModel(models.Model):
    nom = models.CharField(max_length=100)

    def __str__(self):
        return self.nom


class ParticipantModel(models.Model):
    nom = models.CharField(max_length=50)
    uuid = models.UUIDField(unique=True)

    def save(self, *args, **kwargs):
        if not self.uuid:
            self.uuid = uuid.uuid4()
        super(ParticipantModel, self).save(*args, **kwargs)


class TirageModel(models.Model):
    ETATS = (
        ('OPEN', 'En cours'),
        ('CLOSE', 'Terminé'),
    )
    etat = models.CharField(max_length=5, choices=ETATS)
    choix = models.CharField(max_length=100, null=True, blank=True)
    master = models.ForeignKey(ParticipantModel)
    uuid = models.UUIDField(unique=True)
    code = models.CharField(max_length=6, unique=True)

    def save(self, *args, **kwargs):
        if not self.id:
            self.etat = 'OPEN'
            self.choix = None
            self.uuid = uuid.uuid4()
            self.code = get_random_string(6)

        super(TirageModel, self).save(*args, **kwargs)

    def terminer(self, choix):
        self.etat = 'CLOSE'
        self.choix = choix
        self.save()


class SelectionModel(models.Model):
    participant = models.ForeignKey(ParticipantModel)
    tirage = models.ForeignKey(TirageModel, related_name='selections')
    nom = models.CharField(max_length=100)

    class Meta:
        unique_together = ('participant', 'tirage', 'nom')

