# Generated by Django 3.0.3 on 2020-02-05 23:08

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('jobseeker_app', '0003_remove_response_title'),
    ]

    operations = [
        migrations.RenameField(
            model_name='response',
            old_name='date_recieved',
            new_name='date_received',
        ),
    ]
