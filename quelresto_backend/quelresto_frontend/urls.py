from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^tirage/(?P<code>[a-zA-Z0-9]{6})/$', views.tirage,
        name='tirage'),
    url(r'^resultat/(?P<code>[a-zA-Z0-9]{6})/$', views.resultat,
        name='resultat'),
]
