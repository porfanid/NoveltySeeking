import requests
import json

token = 'xWi5tHFb5X4Scwp9pP4dX6hSSnXbdZqjJ9rBjEpfj9jXSkjFj5DKqL5uik4WKwS'
headers = {'Authorization': f'Bearer {token}'}

questions_url = 'https://exploringthebrain.gr/novelty_seeking/assets/questions.json'
questions = json.loads(requests.get(questions_url, headers=headers).text)

print(questions)
exit()

codes_url = 'https://www.exploringthebrain.gr/novelty_seeking/get_all.php'
codes = [i["code"] for i in json.loads(requests.get(codes_url, headers=headers).text.encode('utf-8').decode('unicode-escape'))]

print(codes)

for code in codes:
    url = 'https://www.exploringthebrain.gr/novelty_seeking/get.php?code='+code
    user = json.loads(requests.get(url, headers=headers).text.encode('utf-8').decode('unicode-escape'))
    print(user)
    print('--------------------------------')