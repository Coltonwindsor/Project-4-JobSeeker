from django.db import models

# Create your models here.

class Document(models.Model):
    user = models.CharField(max_length=100)
    resume = models.TextField(default = '')
    cover_letter = models.TextField(default = '')
    linkedin_link = models.CharField(max_length=500)
    github_link = models.CharField(max_length=500)
    portfolio_link = models.CharField(max_length=500)

    def __str__(self):
        return self.user

class Event(models.Model):
    title = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    date = models.DateField()
    time = models.TimeField()
    description = models.TextField(default = '')

    def __str__(self):
        return self.title

class Job(models.Model):
    company = models.CharField(max_length=100)
    title = models.CharField(max_length=100)
    date_posted = models.DateField()
    description = models.TextField(default = '')
    requirements = models.TextField(default = '')
    salary = models.IntegerField(default=0)
    applied_to = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.company} - {self.title}'

class Response(models.Model):
    job = models.ForeignKey(Job, on_delete=models.CASCADE, related_name='jobs')
    company = models.CharField(max_length=100)
    title = models.CharField(max_length=100)
    date_recieved = models.DateField()
    content = models.TextField(default = '')

    def __str__(self):
        return self.company

class Contact(models.Model):
    name = models.CharField(max_length=100)
    company = models.CharField(max_length=100)
    title = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    phone_number = models.IhavenoideaField()

    def __str__(self):
        return self.name