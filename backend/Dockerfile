FROM python:3.9-slim

WORKDIR /backend

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

RUN python3 -m nltk.downloader vader_lexicon

COPY . .

EXPOSE 8000

ENTRYPOINT [ "python3", "-u", "runserver.py" ]
