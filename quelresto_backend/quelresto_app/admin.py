from django.contrib import admin

# Register your models here.
from quelresto_app.models import RestoModel, TirageModel, ParticipantModel

admin.site.register(RestoModel)
admin.site.register(TirageModel)
admin.site.register(ParticipantModel)