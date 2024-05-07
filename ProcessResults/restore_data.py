import json
from os import environ, walk, path
import mysql.connector
from dotenv import load_dotenv

load_dotenv()

# Connect to MySQL database
conn = mysql.connector.connect(
    host=environ.get('DB_HOST'),
    user=environ.get('DB_USERNAME'),
    password=environ.get('DB_PASSWORD'),
    database=environ.get('DB_DATABASE')
)
cursor = conn.cursor()

# Function to iterate through subdirectories recursively
def process_subdirectories(root_dir):
    for root, dirs, files in walk(root_dir):
        for file in files:
            if file == 'questions.json':
                json_file_path = path.join(root, file)
                process_json_file(json_file_path, lang=path.split(root)[-1])

# Function to process JSON file
def process_json_file(json_file_path, lang):
    with open(json_file_path, 'r') as f:
        data = json.load(f)

    for category, category_data in data.items():
        for subcategory, subcategory_data in category_data.items():
            for counter, counter_data in subcategory_data.items():
                question = counter_data.get('question')
                correct_answer = counter_data.get('correct answer')
                false_answers = counter_data.get('false answers')
                
                for answer in [correct_answer] + false_answers:
                    query = "UPDATE answer SET choice = %s WHERE quiz = %s and category = %s and counter = %s and lang = %s"
                    cursor.execute(query, (answer, category, subcategory, counter, lang))
                    conn.commit()

# Define the root directory where JSON files are located
root_directory = 'translations'

# Process all subdirectories
process_subdirectories(root_directory)

# Close connection
cursor.close()
conn.close()

print("Category information updated successfully.")
