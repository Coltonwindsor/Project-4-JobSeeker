from django.urls import include, path
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register('document', views.DocumentView)
router.register('event', views.EventView)
router.register('job', views.JobView)
router.register('response', views.ResponseView)
router.register('contact', views.ContactView)

urlpatterns = [
    path('', include(router.urls))
]