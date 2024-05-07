import gettext
import locale
import mysql.connector
import csv
from datetime import datetime
import json
from os import environ, walk, path
from dotenv import load_dotenv
load_dotenv()

localedir = 'translations'  # Directory containing translations
translate = gettext.translation('base', localedir = localedir, languages=['el'])
_ = translate.gettext

locale.setlocale(locale.LC_ALL, 'el_GR.UTF-8')


def establish_database_connection():
    try:
        conn = mysql.connector.connect(
            host=environ.get('DB_HOST'),
            user=environ.get('DB_USERNAME'),
            password=environ.get('DB_PASSWORD'),
            database=environ.get('DB_DATABASE')
        )
        print(_("Database connection established successfully"))
        return conn
    except mysql.connector.Error as e:
        print(_("Error connecting to database:"), e)
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
                -- language
                MAX(CASE WHEN a.id = 1 THEN a.lang END) AS lang_1,
                MAX(CASE WHEN a.id = 2 THEN a.lang END) AS lang_2,
                MAX(CASE WHEN a.id = 3 THEN a.lang END) AS lang_3,
                MAX(CASE WHEN a.id = 4 THEN a.lang END) AS lang_4,
                MAX(CASE WHEN a.id = 5 THEN a.lang END) AS lang_5,
                MAX(CASE WHEN a.id = 6 THEN a.lang END) AS lang_6,
                MAX(CASE WHEN a.id = 7 THEN a.lang END) AS lang_7,
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
        print(_("Error fetching data from database:"), e)
        return None


def process_subdirectories(root_dir):
    translations = {}
    for root, dirs, files in walk(root_dir):
        for file in files:
            if file == 'questions.json':
                json_file_path = path.join(root, file)
                lang=path.split(root)[-1]
                with open(json_file_path, 'r') as f:
                    data = json.load(f)
                    translations[lang] = data
    return translations


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
        lang = user_data[f"lang_{i}"]
        
        if not user_data[f'quiz_{i}']:
            continue
        is_answer_correct = user_data[f"quiz_{i}"] == question_data[lang][choice][category][counter]["correct answer"]
        if is_answer_correct:
            positions_of_correct_answers.append(str(i))
        else:
            positions_of_wrong_answers.append(str(i))
    return len(positions_of_correct_answers), ", ".join(positions_of_wrong_answers)


def write_to_csv(data, question_data):
    # Mapping English column names to Greek ones
    column_mapping = {
        'code': _('Code'),
        'year_of_birth': _('birthdate'),
        'sex': _('Sex'),
        'choice_1': _("Choice")+' 1',
        'choice_2': _("Choice")+' 2',
        'choice_3': _("Choice")+' 3',
        'choice_4': _("Choice")+' 4',
        'choice_5': _("Choice")+' 5',
        'choice_6': _("Choice")+' 6',
        'choice_7': _("Choice")+' 7',
        'date_1': _("Time")+' 1',
        'date_2': _("Time")+' 2',
        'date_3': _("Time")+' 3',
        'date_4': _("Time")+' 4',
        'date_5': _("Time")+' 5',
        'date_6': _("Time")+' 6',
        'date_7': _("Time")+' 7'
    }

    for i in range(1, 37):
        column_mapping[f'answer_{i}'] = f'{_("question")} {i}'

    with open('output.csv', mode='w', newline='') as file:
        fieldnames = [_('Code'), _("class"), _('birthdate'), _('Sex'), _('Age'),
                        _("Choice")+' 1', _("Time")+' 1', _("Choice")+' 2', _("Time")+' 2', _("Choice")+' 3', _("Time")+' 3', _("Choice")+' 4', _("Time")+' 4', _("Choice")+' 5', _("Time")+' 5', _("Choice")+' 6', _("Time")+' 6', _("Choice")+' 7', _("Time")+' 7'
                        , _('Answered Questions'), _("Questions Answered Correctly"), _("Positions of wrong answers"), _('Observations'), _("way-answered (digitally/physical)"),
                    ]

        for i in range(1, 37):
            fieldnames.append(f'{_("question")} {i}')
        writer = csv.DictWriter(file, fieldnames=fieldnames)

        # Write header with Greek column names
        writer.writeheader()

        # Write data with Greek column names
        for row in data:
            mapped_row = {column_mapping[key]: value for key, value in row.items() if key in column_mapping}
            birthdate = row['year_of_birth']
            if birthdate != "null":
                birth_year = int(birthdate[1:5])
                mapped_row[_('birthdate')] = birth_year
                mapped_row[_('Age')] = calculate_age(birth_year)
            else:
                mapped_row[_('birthdate')] = ""
                mapped_row[_('Age')] = ""

            mapped_row[_('Observations')] = ""
            mapped_row[_("way-answered (digitally/physical)")]=""

            mapped_row[_('Sex')] = _("Male") if row["sex"] == "male" else _("Female") if row["sex"] == "female" else ""

            num_questions_answered = sum(
                1 for key, value in row.items() if key.startswith('quiz') and value and value != "null")
            mapped_row[_('Answered Questions')] = num_questions_answered
            temp = [(key[-1:]) for i, (key, value) in enumerate(row.items()) if key.startswith('quiz') and value and value != "null"]

            num_correct_answers = count_correct_answers(row, question_data)
            mapped_row[_("Questions Answered Correctly")], mapped_row[_("Positions of wrong answers")] = num_correct_answers
            
            
            depts = [_("First"), _("Second"), _("Third"), _("Fifth"), _("Sixth")]
            schools=[_('Primary'), _("Secondary"), _("High School")]
            mapped_row[_("class")] = depts[row["answer_37"]%10 if row["answer_37"]//10>0 else row["answer_37"]%10+3]+" "+schools[row["answer_37"]//10-1] if row["answer_37"] else ""
            writer.writerow(mapped_row)


def main():
    # Database connection parameters

    
    questions_data = process_subdirectories("./translations")
    # Establish database connection
    conn = establish_database_connection()
    if conn is None:
        return
    # Fetch data from the database
    data = fetch_data_from_database(conn)
    conn.close()
    # Write data to CSV file
    write_to_csv(data, questions_data)


if __name__ == "__main__":
    main()
