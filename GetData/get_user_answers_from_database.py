def get_answers():
    import requests
    import json
    token = 'xWi5tHFb5X4Scwp9pP4dX6hSSnXbdZqjJ9rBjEpfj9jXSkjFj5DKqL5uik4WKwS'
    headers = {'Authorization': f'Bearer {token}'}

    codes_url = 'https://www.exploringthebrain.gr/novelty_seeking/get_id.php'
    result = requests.get(codes_url, headers=headers).text.encode('utf-8').decode('unicode-escape')
    print(result)
    codes = [i["code"] for i in json.loads(result)]

    user = {}

    for code in codes:
        user[code] = {1: {}, 2: {}, 3: {}, 4: {}, 5: {}, 6: {}, 7: {}, 8: {}}
        
        url = 'https://www.exploringthebrain.gr/novelty_seeking/get.php?code=' + code
        answer = json.loads(requests.get(url, headers=headers).text.encode('utf-8').decode('unicode-escape'))
        
        for entry in answer:
            question_id = int(entry['id'])
            user[code][question_id]["choice"] = entry["choice"]
            user[code][question_id]["category"] = entry["category"]
            user[code][question_id]["counter"] = entry["counter"]
            user[code][question_id]["quiz"] = entry["quiz"]
        print(f"User: {code} has been downloaded")
    return user