# Generated by Django 5.1.3 on 2024-11-23 02:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rooms', '0007_remove_room_tags_room_tags'),
    ]

    operations = [
        migrations.AlterField(
            model_name='room',
            name='tags',
            field=models.ManyToManyField(blank=True, null=True, to='rooms.tag'),
        ),
    ]
