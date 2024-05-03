import mysql.connector
import csv
from datetime import datetime
import requests, json


def establish_database_connection(database, username, password):
    try:
        conn = mysql.connector.connect(
            host="localhost",
            user=username,
            password=password,
            database=database
        )
        print("Database connection established successfully")
        return conn
    except mysql.connector.Error as e:
        print("Error connecting to database:", e)
        return None


def fetch_data_from_database(conn):
    try:
        cursor = conn.cursor(dictionary=True)
        cursor.execute("""SELECT u.code, 
       u.year_of_birth, 
       u.sex,
       -- Pivot for answer table
       MAX(CASE WHEN a.id = 1 THEN a.choice END) AS choice_1,
       MAX(CASE WHEN a.id = 2 THEN a.choice END) AS choice_2,
       MAX(CASE WHEN a.id = 3 THEN a.choice END) AS choice_3,
       MAX(CASE WHEN a.id = 4 THEN a.choice END) AS choice_4,
       MAX(CASE WHEN a.id = 5 THEN a.choice END) AS choice_5,
       MAX(CASE WHEN a.id = 6 THEN a.choice END) AS choice_6,
       MAX(CASE WHEN a.id = 7 THEN a.choice END) AS choice_7,
       MAX(CASE WHEN a.id = 1 THEN a.category END) AS category_1,
       MAX(CASE WHEN a.id = 2 THEN a.category END) AS category_2,
       MAX(CASE WHEN a.id = 3 THEN a.category END) AS category_3,
       MAX(CASE WHEN a.id = 4 THEN a.category END) AS category_4,
       MAX(CASE WHEN a.id = 5 THEN a.category END) AS category_5,
       MAX(CASE WHEN a.id = 6 THEN a.category END) AS category_6,
       MAX(CASE WHEN a.id = 7 THEN a.category END) AS category_7,
       MAX(CASE WHEN a.id = 1 THEN a.counter END) AS counter_1,
       MAX(CASE WHEN a.id = 2 THEN a.counter END) AS counter_2,
       MAX(CASE WHEN a.id = 3 THEN a.counter END) AS counter_3,
       MAX(CASE WHEN a.id = 4 THEN a.counter END) AS counter_4,
       MAX(CASE WHEN a.id = 5 THEN a.counter END) AS counter_5,
       MAX(CASE WHEN a.id = 6 THEN a.counter END) AS counter_6,
       MAX(CASE WHEN a.id = 7 THEN a.counter END) AS counter_7,
       MAX(CASE WHEN a.id = 1 THEN a.quiz END) AS quiz_1,
       MAX(CASE WHEN a.id = 2 THEN a.quiz END) AS quiz_2,
       MAX(CASE WHEN a.id = 3 THEN a.quiz END) AS quiz_3,
       MAX(CASE WHEN a.id = 4 THEN a.quiz END) AS quiz_4,
       MAX(CASE WHEN a.id = 5 THEN a.quiz END) AS quiz_5,
       MAX(CASE WHEN a.id = 6 THEN a.quiz END) AS quiz_6,
       MAX(CASE WHEN a.id = 7 THEN a.quiz END) AS quiz_7,
       -- Dates
       MAX(CASE WHEN a.id = 1 THEN a.date END) AS date_1,
       MAX(CASE WHEN a.id = 2 THEN a.date END) AS date_2,
       MAX(CASE WHEN a.id = 3 THEN a.date END) AS date_3,
       MAX(CASE WHEN a.id = 4 THEN a.date END) AS date_4,
       MAX(CASE WHEN a.id = 5 THEN a.date END) AS date_5,
       MAX(CASE WHEN a.id = 6 THEN a.date END) AS date_6,
       MAX(CASE WHEN a.id = 7 THEN a.date END) AS date_7,
       -- Pivot for questioner table
       MAX(CASE WHEN q.id = 1 THEN q.answer END) AS answer_1,
       MAX(CASE WHEN q.id = 2 THEN q.answer END) AS answer_2,
       MAX(CASE WHEN q.id = 3 THEN q.answer END) AS answer_3,
       MAX(CASE WHEN q.id = 4 THEN q.answer END) AS answer_4,
       MAX(CASE WHEN q.id = 5 THEN q.answer END) AS answer_5,
       MAX(CASE WHEN q.id = 6 THEN q.answer END) AS answer_6,
       MAX(CASE WHEN q.id = 7 THEN q.answer END) AS answer_7,
       MAX(CASE WHEN q.id = 8 THEN q.answer END) AS answer_8,
       MAX(CASE WHEN q.id = 9 THEN q.answer END) AS answer_9,
       MAX(CASE WHEN q.id = 10 THEN q.answer END) AS answer_10,
       MAX(CASE WHEN q.id = 11 THEN q.answer END) AS answer_11,
       MAX(CASE WHEN q.id = 12 THEN q.answer END) AS answer_12,
       MAX(CASE WHEN q.id = 13 THEN q.answer END) AS answer_13,
       MAX(CASE WHEN q.id = 14 THEN q.answer END) AS answer_14,
       MAX(CASE WHEN q.id = 15 THEN q.answer END) AS answer_15,
       MAX(CASE WHEN q.id = 16 THEN q.answer END) AS answer_16,
       MAX(CASE WHEN q.id = 17 THEN q.answer END) AS answer_17,
       MAX(CASE WHEN q.id = 18 THEN q.answer END) AS answer_18,
       MAX(CASE WHEN q.id = 19 THEN q.answer END) AS answer_19,
       MAX(CASE WHEN q.id = 20 THEN q.answer END) AS answer_20,
       MAX(CASE WHEN q.id = 21 THEN q.answer END) AS answer_21,
       MAX(CASE WHEN q.id = 22 THEN q.answer END) AS answer_22,
       MAX(CASE WHEN q.id = 23 THEN q.answer END) AS answer_23,
       MAX(CASE WHEN q.id = 24 THEN q.answer END) AS answer_24,
       MAX(CASE WHEN q.id = 25 THEN q.answer END) AS answer_25,
       MAX(CASE WHEN q.id = 26 THEN q.answer END) AS answer_26,
       MAX(CASE WHEN q.id = 27 THEN q.answer END) AS answer_27,
       MAX(CASE WHEN q.id = 28 THEN q.answer END) AS answer_28,
       MAX(CASE WHEN q.id = 29 THEN q.answer END) AS answer_29,
       MAX(CASE WHEN q.id = 30 THEN q.answer END) AS answer_30,
       MAX(CASE WHEN q.id = 31 THEN q.answer END) AS answer_31,
       MAX(CASE WHEN q.id = 32 THEN q.answer END) AS answer_32,
       MAX(CASE WHEN q.id = 33 THEN q.answer END) AS answer_33,
       MAX(CASE WHEN q.id = 34 THEN q.answer END) AS answer_34,
       MAX(CASE WHEN q.id = 35 THEN q.answer END) AS answer_35,
       MAX(CASE WHEN q.id = 36 THEN q.answer END) AS answer_36,
       MAX(CASE WHEN q.id = 37 THEN q.answer END) AS answer_37
FROM user u
LEFT JOIN answer a ON u.code = a.code AND a.id IN (1, 2, 3, 4, 5, 6, 7)
LEFT JOIN questioner q ON u.code = q.code AND q.id BETWEEN 1 AND 37
GROUP BY u.code, u.year_of_birth, u.sex
""")
        data = cursor.fetchall()
        return data
    except mysql.connector.Error as e:
        print("Error fetching data from database:", e)
        return None


def download_questions(url):
    try:
        response = requests.get(url)
        response.raise_for_status()
        questions_data = response.json()
        return questions_data
    except requests.exceptions.RequestException as e:
        print("Error downloading questions data:", e)
        return None

def calculate_age(birthdate):
    if birthdate == "null":
        return "null"
    current_year = datetime.now().year
    age = current_year - birthdate
    return age


def count_correct_answers(user_data, question_data):
    positions_of_wrong_answers = []
    positions_of_correct_answers = []
    for i in range(1, 8):
        choice = user_data[f"choice_{i}"]
        category = user_data[f"category_{i}"]
        counter = user_data[f"counter_{i}"]
        if not user_data[f'quiz_{i}']:
            continue
        is_answer_correct = user_data[f"quiz_{i}"] == question_data[choice][category][counter]["correct answer"]
        if is_answer_correct:
            positions_of_correct_answers.append(str(i))
        else:
            print(f"{i}: {user_data[f'quiz_{i}']} : {question_data[choice][category][counter]['correct answer']}")
            positions_of_wrong_answers.append(str(i))
    return len(positions_of_correct_answers), ", ".join(positions_of_wrong_answers) # ", ".join(positions_of_wrong_answers)


def write_to_csv(data, question_data):
    # Mapping English column names to Greek ones
    column_mapping = {
        'code': 'Κωδικός',
        'year_of_birth': 'ημερομηνία γέννησης',
        'sex': 'Φύλο',
        'choice_1': 'Επιλογή 1',
        'choice_2': 'Επιλογή 2',
        'choice_3': 'Επιλογή 3',
        'choice_4': 'Επιλογή 4',
        'choice_5': 'Επιλογή 5',
        'choice_6': 'Επιλογή 6',
        'choice_7': 'Επιλογή 7',
        'date_1': 'Χρόνος 1',
        'date_2': 'Χρόνος 2',
        'date_3': 'Χρόνος 3',
        'date_4': 'Χρόνος 4',
        'date_5': 'Χρόνος 5',
        'date_6': 'Χρόνος 6',
        'date_7': 'Χρόνος 7'
    }

    for i in range(1, 37):
        column_mapping[f'answer_{i}'] = f'Ερώτηση {i}'

    with open('output.csv', mode='w', newline='') as file:
        fieldnames = ['Κωδικός', 'Τμήμα', 'ημερομηνία γέννησης', 'Φύλο', 'Ηλικία',
                        'Επιλογή 1', 'Χρόνος 1', 'Επιλογή 2', 'Χρόνος 2', 'Επιλογή 3', 'Χρόνος 3', 'Επιλογή 4', 'Χρόνος 4', 'Επιλογή 5', 'Χρόνος 5', 'Επιλογή 6', 'Χρόνος 6', 'Επιλογή 7', 'Χρόνος 7'
                        , 'Απαντημένες Ερωτήσεις', 'Ερωτήσεις που απαντήθηκαν σωστά', 'Θέσεις λανθασμένων απαντήσεων', 'Παρατηρήσεις', 'Τρόπος απάντησης(Έντυπα, ψηφιακά)'
                    ]

        for i in range(1, 37):
            fieldnames.append(f'Ερώτηση {i}')
        writer = csv.DictWriter(file, fieldnames=fieldnames)

        # Write header with Greek column names
        writer.writeheader()

        # Write data with Greek column names
        for row in data:
            mapped_row = {column_mapping[key]: value for key, value in row.items() if key in column_mapping}
            birthdate = row['year_of_birth']
            if birthdate != "null":
                birth_year = int(birthdate[1:5])
                mapped_row['ημερομηνία γέννησης'] = birth_year
                mapped_row['Ηλικία'] = calculate_age(birth_year)
            else:
                mapped_row['ημερομηνία γέννησης'] = ""
                mapped_row['Ηλικία'] = ""

            mapped_row['Παρατηρήσεις'] = ""
            mapped_row['Τρόπος απάντησης(Έντυπα, ψηφιακά)']=""

            mapped_row['Φύλο'] = "Αγόρι" if row["sex"] == "male" else "Κορίτσι" if row["sex"] == "female" else ""

            num_questions_answered = sum(
                1 for key, value in row.items() if key.startswith('quiz') and value and value != "null")
            mapped_row['Απαντημένες Ερωτήσεις'] = num_questions_answered
            temp = [(key[-1:]) for i, (key, value) in enumerate(row.items()) if key.startswith('quiz') and value and value != "null"]

            num_correct_answers = count_correct_answers(row, question_data)
            mapped_row['Ερωτήσεις που απαντήθηκαν σωστά'], mapped_row['Θέσεις λανθασμένων απαντήσεων'] = num_correct_answers
            depts = ["Πρώτη", "Δευτέρα", "Τρίτη", "Πέμπτη", "Έκτη"]
            schools=["Δημοτικού", "Γυμνασίου", "Λυκείου"]
            print(row["answer_37"])
            mapped_row["Τμήμα"] = depts[row["answer_37"]%10 if row["answer_37"]//10>0 else row["answer_37"]%10+3]+" "+schools[row["answer_37"]//10-1] if row["answer_37"] else ""
            print(f"{temp} : {mapped_row['Ερωτήσεις που απαντήθηκαν σωστά']} : {mapped_row['Θέσεις λανθασμένων απαντήσεων']}")

            writer.writerow(mapped_row)

//TODO: Change the variables to match your configuration
def main():
    # Database connection parameters
    database = "db"
    username = "user"
    password = "passwd"

    questions_url = "https://exploringthebrain.gr/novelty_seeking/assets/questions.json"
    questions_data = download_questions(questions_url)

    # Establish database connection
    conn = establish_database_connection(database, username, password)
    if conn is None:
        return

    # Fetch data from the database
    data = fetch_data_from_database(conn)
    conn.close()

    # Write data to CSV file
    write_to_csv(data, questions_data)


if __name__ == "__main__":
    main()
