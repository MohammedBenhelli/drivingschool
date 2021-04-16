# Generated by Django 3.0.4 on 2021-04-16 13:09

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Account',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('role', models.CharField(choices=[('Student', 'Student'), ('Instructor', 'Instructor'), ('Secretary', 'Secretary'), ('Admin', 'Admin')], default='Student', max_length=50)),
                ('hours', models.PositiveSmallIntegerField(default=0)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='account', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Appointment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('hour', models.DateTimeField()),
                ('lieux', models.CharField(max_length=50)),
                ('date', models.DateField()),
                ('instructor', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='instructor', to='api.Account')),
                ('student', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='student', to='api.Account')),
            ],
        ),
    ]