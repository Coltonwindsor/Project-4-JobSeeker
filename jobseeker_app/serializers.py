from rest_framework import serializers
from .models import Document, Event, Job, Response, Contact

class ContactSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Contact
        fields = ('__all__')

class ResponseSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Response
        fields = ('__all__')

class JobSerializer(serializers.ModelSerializer):
    responses = ResponseSerializer(many=True, read_only=True)
    class Meta: 
        model = Job
        fields = ('id', 'company', 'title', 'date_posted', 'description', 'requirements', 'salary', 'responses' )

class EventSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Event
        fields = ('__all__')

class DocumentSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Document
        fields = ('__all__')



