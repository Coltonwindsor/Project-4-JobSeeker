# Generated by Django 3.0.3 on 2020-02-04 21:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jobseeker_app', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='contact',
            name='title',
        ),
        migrations.AlterField(
            model_name='job',
            name='date_posted',
            field=models.CharField(max_length=100),
        ),
    ]
