# Variables
PYTHON=python3
MANAGE=manage.py
VENV_DIR=.venv
ACTIVATE=$(VENV_DIR)/bin/activate

# Detect OS
UNAME_S := $(shell uname -s)
ifeq ($(OS),Windows_NT)
	ACTIVATE=$(VENV_DIR)/Scripts/activate
endif

.PHONY: venv build run migrate makemigrations createsuperuser clean

venv:
	$(PYTHON) -m venv $(VENV_DIR) && $(ACTIVATE)
	@echo "Virtual environment created in $(VENV_DIR)"

install:
	. $(ACTIVATE) && pip install -r requirements.txt

build: reinstalldjango makemigrations migrate

run:
	. $(ACTIVATE) && daphne config.asgi:application

migrate:
	. $(ACTIVATE) && $(PYTHON) $(MANAGE) migrate

makemigrations:
	. $(ACTIVATE) && $(PYTHON) $(MANAGE) makemigrations

createsuperuser:
	. $(ACTIVATE) && $(PYTHON) $(MANAGE) createsuperuser

reinstalldjango:
	pip uninstall django -y
	pip install django

clean:
	find . -path "*/migrations/*.py" -not -name "__init__.py" -delete
	find . -path "*/migrations/*.pyc" -delete
	rm -f db.sqlite3
	@echo "Cleaned migration files"

