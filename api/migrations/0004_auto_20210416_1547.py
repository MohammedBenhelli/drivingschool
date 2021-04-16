# Generated by Django 3.0.4 on 2021-04-16 15:47

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_auto_20210416_1544'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='appointment',
            name='instructor',
        ),
        migrations.AddField(
            model_name='appointment',
            name='instructor',
            field=models.OneToOneField(default=None, on_delete=django.db.models.deletion.CASCADE, related_name='instructor', to='api.Account'),
        ),
        migrations.RemoveField(
            model_name='appointment',
            name='student',
        ),
        migrations.AddField(
            model_name='appointment',
            name='student',
            field=models.OneToOneField(default=None, on_delete=django.db.models.deletion.CASCADE, related_name='student', to='api.Account'),
        ),
    ]
