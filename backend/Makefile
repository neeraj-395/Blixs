# Variables
PYTHON=python
MANAGE=manage.py
VENV_DIR=.venv

# Detect OS-specific paths
ifeq ($(OS),Windows_NT)
	PIP=$(VENV_DIR)/Scripts/pip
	PY=$(VENV_DIR)/Scripts/python
else
	PIP=$(VENV_DIR)/bin/pip
	PY=$(VENV_DIR)/bin/python
endif

.PHONY: setup build run migrate makemigrations createsuperuser clean

setup:
	$(PYTHON) -m venv $(VENV_DIR)
	$(PIP) install --upgrade pip
	$(PIP) install -r requirements.txt

build: makemigrations migrate

loaddata:
	$(PYTHON) manage.py loaddata user/fixtures/default_users.json
	$(PYTHON) manage.py loaddata chat/fixtures/default_chats.json
	$(PYTHON) manage.py loaddata post/fixtures/default_posts.json


run:
	daphne config.asgi:application

migrate:
	$(PY) $(MANAGE) migrate

makemigrations:
	$(PY) $(MANAGE) makemigrations chat
	$(PY) $(MANAGE) makemigrations notification
	$(PY) $(MANAGE) makemigrations post
	$(PY) $(MANAGE) makemigrations storie
	$(PY) $(MANAGE) makemigrations user

createsuperuser:
	$(PY) $(MANAGE) createsuperuser

clean:
	find . -path "*/migrations/*.py" -not -name "__init__.py" -delete
	find . -path "*/migrations/*.pyc" -delete
	rm -f db.sqlite3
	rm -rf .venv
