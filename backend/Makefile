# Variables
PYTHON=python
MANAGE=manage.py
VENV_DIR=.venv
UNAME_S := $(shell uname -s)

# Set ACTIVATE to absolute path
ifeq ($(OS),Windows_NT)
	ACTIVATE := $(realpath $(VENV_DIR)/Scripts/activate)
else
	ACTIVATE := $(realpath $(VENV_DIR)/bin/activate)
endif

.PHONY: venv build run migrate makemigrations createsuperuser clean

setup:
	. $(PYTHON) -m venv $(VENV_DIR) && . $(ACTIVATE)
	. $(ACTIVATE) && pip install -r requirements.txt

build:
	makemigrations
	migrate

run:
	. daphne config.asgi:application

migrate:
	. $(PYTHON) $(MANAGE) migrate

makemigrations:
	. $(PYTHON) $(MANAGE) makemigrations chat
	. $(PYTHON) $(MANAGE) makemigrations notification
	. $(PYTHON) $(MANAGE) makemigrations post
	. $(PYTHON) $(MANAGE) makemigrations storie
	. $(PYTHON) $(MANAGE) makemigrations user

createsuperuser:
	. $(PYTHON) $(MANAGE) createsuperuser

clean:
	find . -path "*/migrations/*.py" -not -name "__init__.py" -delete
	find . -path "*/migrations/*.pyc" -delete
	rm -f db.sqlite3
	@echo "Cleaned migration files"

