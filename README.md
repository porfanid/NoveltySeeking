# NoveltySeeking

# Οδηγός Χρήσης - Ανάλυση Κώδικα Python

## Εισαγωγή

Καλώς ήρθατε στον οδηγό χρήσης του έργου NoveltySeeking! Σε αυτόν τον οδηγό, θα κάνουμε μια ανάλυση του κώδικα Python που έχει γραφεί για το έργο.

## Αρχεία

### `get_user_answers_from_database.py`

Στο αρχείο αυτό υπάρχει ο κώδικας που υλοποιεί τη λειτουργία `get_answers()`. Ας ρίξουμε μια ματιά στις βασικές λειτουργίες:

```python
def get_answers():
    # Εισαγωγή απαραίτητων βιβλιοθηκών
    import requests
    import json

    # Ορισμός του τοκέν για πρόσβαση στο API
    token = 'xWi5tHFb5X4Scwp9pP4dX6hSSnXbdZqjJ9rBjEpfj9jXSkjFj5DKqL5uik4WKwS'
    headers = {'Authorization': f'Bearer {token}'}

    # Κλήση API για λήψη όλων των απαντήσεων από τη βάση δεδομένων
    codes_url = 'https://www.exploringthebrain.gr/novelty_seeking/get_all.php'
    codes = [i["code"] for i in json.loads(requests.get(codes_url, headers=headers).text.encode('utf-8').decode('unicode-escape'))]

    # Δημιουργία δομής χρήστη για αποθήκευση απαντήσεων
    user = {}

    for code in codes:
        user[code] = {1: {}, 2: {}, 3: {}, 4: {}, 5: {}, 6: {}, 7: {}, 8: {}}
        
        # Κλήση API για λήψη απαντήσεων ανά χρήστη
        url = 'https://www.exploringthebrain.gr/novelty_seeking/get.php?code=' + code
        answer = json.loads(requests.get(url, headers=headers).text.encode('utf-8').decode('unicode-escape'))
        
        # Αποθήκευση απαντήσεων στη δομή χρήστη
        for entry in answer:
            question_id = int(entry['id'])
            user[code][question_id]["choice"] = entry["choice"]
            user[code][question_id]["category"] = entry["category"]
            user[code][question_id]["counter"] = entry["counter"]
            user[code][question_id]["quiz"] = entry["quiz"]
    
    return user
```

### `download.py`
Στο αρχείο αυτό γίνεται χρήση της λειτουργίας get_answers() για τη λήψη των απαντήσεων από τη βάση δεδομένων. Επιπλέον, γίνεται εκτύπωση των απαντήσεων.

```python
from get_user_answers_from_database import get_answers

# Ορισμός του τοκέν για πρόσβαση στο API
token = 'xWi5tHFb5X4Scwp9pP4dX6hSSnXbdZqjJ9rBjEpfj9jXSkjFj5DKqL5uik4WKwS'
headers = {'Authorization': f'Bearer {token}'}

# Κλήση λειτουργίας για λήψη απαντήσεων
users = get_answers()

# Εκτύπωση απαντήσεων
print(users)
```

### `main.py`
Στο αρχείο αυτό γίνεται η έναρξη του προγράμματος, στο οποίο καλούνται οι βοηθητικές συναρτήσεις που περιέγραψα παραπάνω.

```python
from get_user_answers_from_database import get_answers
from get_questions import get_questions

users = get_answers()
questions = get_questions()

print(questions)
```

## Πώς να ξεκινήσετε

Για να ξεκινήσετε με το έργο, ακολουθήστε τα παρακάτω βήματα:

1. Κλωνοποιήστε το αποθετήριο στον υπολογιστή σας.
1. Τρέξτε τον κώδικα που βρίσκεται στο αρχείο GetData/main.py

Με αυτά τα βήματα, θα είστε έτοιμοι να ξεκινήσετε την ανάπτυξη και την ανάλυση του κώδικα!

Ευχαριστούμε που χρησιμοποιείτε το [Όνομα Έργου]!