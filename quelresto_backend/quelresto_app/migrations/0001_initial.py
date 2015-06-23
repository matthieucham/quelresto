# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='RestoModel',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, primary_key=True, auto_created=True)),
                ('nom', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='SelectionModel',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, primary_key=True, auto_created=True)),
                ('nom', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='TirageModel',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, primary_key=True, auto_created=True)),
                ('etat', models.CharField(choices=[('OPEN', 'En cours'), ('CLOSE', 'Terminé')], max_length=5)),
                ('choix', models.CharField(blank=True, null=True, max_length=100)),
                ('master', models.ForeignKey(to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='selectionmodel',
            name='tirage',
            field=models.ForeignKey(to='quelresto_app.TirageModel'),
        ),
        migrations.AddField(
            model_name='selectionmodel',
            name='user',
            field=models.ForeignKey(to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterUniqueTogether(
            name='selectionmodel',
            unique_together=set([('user', 'tirage', 'nom')]),
        ),
    ]
