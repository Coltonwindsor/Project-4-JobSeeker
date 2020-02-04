from django.contrib import admin
from .models import Document, Event, Job, Response, Contact
# Register your models here.

admin.site.register([Document, Event, Job, Response, Contact])