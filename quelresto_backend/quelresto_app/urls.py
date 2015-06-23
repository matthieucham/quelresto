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
    url(r'^tirages/$', views.TirageInit.as_view()),
    url(r'^tirages/(?P<pk>[0-9]+)/$', tirage_detail),
    url(r'^tirages/(?P<pk>[0-9]+)/shuffle/$', tirage_shuffle),
]

urlpatterns = format_suffix_patterns(urlpatterns)