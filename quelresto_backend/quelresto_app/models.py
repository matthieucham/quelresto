from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class RestoModel(models.Model):
    nom = models.CharField(max_length=100)

    def __str__(self):
        return self.nom


class TirageModel(models.Model):
    ETATS = (
        ('OPEN', 'En cours'),
        ('CLOSE', 'Terminé'),
    )
    etat = models.CharField(max_length=5, choices=ETATS)
    choix = models.CharField(max_length=100, null=True, blank=True)
    master = models.ForeignKey(User)

    def save(self, *args, **kwargs):
        if not self.id:
            self.etat = 'OPEN'
            self.choix = None
        super(TirageModel, self).save(*args, **kwargs)

    def terminer(self, choix):
        self.etat = 'CLOSE'
        self.choix = choix
        self.save()


class SelectionModel(models.Model):
    user = models.ForeignKey(User)
    tirage = models.ForeignKey(TirageModel, related_name='selections')
    nom = models.CharField(max_length=100)

    class Meta:
        unique_together = ('user', 'tirage', 'nom')
