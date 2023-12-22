token = 'xWi5tHFb5X4Scwp9pP4dX6hSSnXbdZqjJ9rBjEpfj9jXSkjFj5DKqL5uik4WKwS'
headers = {'Authorization': f'Bearer {token}'}

import requests
import json

def get_questions():
    questions_url = 'https://exploringthebrain.gr/novelty_seeking/assets/questions.json'
    questions = json.loads(requests.get(questions_url, headers=headers).text)
    return questions