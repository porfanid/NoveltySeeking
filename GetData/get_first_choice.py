def get_first_answer():
    import requests
    import json
    token = 'xWi5tHFb5X4Scwp9pP4dX6hSSnXbdZqjJ9rBjEpfj9jXSkjFj5DKqL5uik4WKwS'
    headers = {'Authorization': f'Bearer {token}'}

    first_answers_url = 'https://www.exploringthebrain.gr/novelty_seeking/get_first.php'
    result = requests.get(first_answers_url, headers=headers).text.encode('utf-8').decode('unicode-escape')
    print(result)
    codes = [i for i in json.loads(result)]
    return codes


if __name__ == '__main__':
    print(get_first_answer())
