# Generated by Django 5.1.7 on 2025-03-28 04:14

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Notification',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('message', models.CharField(max_length=255)),
                ('is_read', models.BooleanField(default=False)),
                ('created_at', models.DateTimeField(auto_now_add=True, db_index=True)),
                ('notification_type', models.CharField(choices=[('INFO', 'info'), ('WARNING', 'WARNING'), ('ERROR', 'Error'), ('SUCCESS', 'Success')], default='INFO', max_length=50)),
            ],
        ),
    ]
