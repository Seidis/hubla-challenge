FROM python:3.8-slim-buster

WORKDIR /api

COPY requirements.txt requirements.txt

RUN python3 -m venv venv
RUN . venv/bin/activate
RUN pip3 install -r requirements.txt

COPY . .

