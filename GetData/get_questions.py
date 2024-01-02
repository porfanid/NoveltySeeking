import requests
import json

def get_questions():
    questions_url = 'https://exploringthebrain.gr/novelty_seeking/assets/questions.json'
    questions = json.loads(requests.get(questions_url).text)
    return questions