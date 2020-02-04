from django.db import models

# Create your models here.

class Document(models.Model):
    user = models.CharField(max_length=100)
    resume = models.TextField(default = '', blank=True)
    cover_letter = models.TextField(default = '', blank=True)
    linkedin_link = models.CharField(max_length=500)
    github_link = models.CharField(max_length=500)
    portfolio_link = models.CharField(max_length=500)

    def __str__(self):
        return self.user

class Event(models.Model):
    title = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    datetime = models.CharField(max_length=100)
    description = models.TextField(default = '', blank=True)

    def __str__(self):
        return self.title

class Job(models.Model):
    company = models.CharField(max_length=100)
    title = models.CharField(max_length=100)
    date_posted = models.CharField(max_length=100)
    description = models.TextField(default = '', blank=True)
    requirements = models.TextField(default = '', blank=True)
    salary = models.IntegerField(default=0)
    applied_to = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.company} - {self.title}'

class Response(models.Model):
    job = models.ForeignKey(Job, on_delete=models.CASCADE, related_name='jobs')
    company = models.CharField(max_length=100)
    date_recieved = models.CharField(max_length=100)
    content = models.TextField(default = '', blank=True)

    def __str__(self):
        return self.company

class Contact(models.Model):
    name = models.CharField(max_length=100)
    company = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=25)

    def __str__(self):
        return self.name