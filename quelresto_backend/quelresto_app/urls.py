from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from quelresto_app import views

tirage_detail = views.TirageDetail.as_view(
    {'get': 'retrieve',
     'post': 'update'})

tirage_shuffle = views.TirageDetail.as_view(
    {'post': 'shuffle'}
)

urlpatterns = [
    url(r'^restos/$', views.RestoList.as_view()),
    url(r'^participants/$', views.ParticipantDetail.as_view({'post': 'create'})),
    url(r'^participants/(?P<uuid>[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})/$',
        views.ParticipantDetail.as_view({'get': 'retrieve'})),
    url(r'^tirages/$', views.TirageInit.as_view()),
    url(r'^tirages/(?P<code>[a-zA-Z0-9]{6})/$', tirage_detail),
    url(r'^tirages/(?P<code>[a-zA-Z0-9]{6})/shuffle/$', tirage_shuffle),
]

urlpatterns = format_suffix_patterns(urlpatterns)
