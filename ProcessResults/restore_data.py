import json
import mysql.connector
from os import environ

# Load JSON file
with open('/home/porfanid/programming/NoveltySeeking/novelty-seeking/public/assets/questions.json', 'r') as f:
    data = json.load(f)

# Connect to MySQL database
conn = mysql.connector.connect(
    host=environ.get('DB_HOST'),
    user=environ.get('DB_USERNAME'),
    password=environ.get('DB_PASSWORD'),
    database=environ.get('DB_DATABASE')
)
cursor = conn.cursor()

# Iterate through JSON data and update MySQL table
for category, category_data in data.items():
    print(category)
    for subcategory, subcategory_data in category_data.items():
        print(subcategory)
        for counter, counter_data in subcategory_data.items():
            question = counter_data.get('question')
            correct_answer = counter_data.get('correct answer')
            false_answers = counter_data.get('false answers')
            
            # Update MySQL table with category information
            for answer in [correct_answer] + false_answers:
                query = "UPDATE answer SET choice = %s WHERE quiz = %s  and category=%s and counter=%s"
#                query = "UPDATE answer SET category = {} WHERE quiz = {} and category={} and counter={}".format(category, answer, subcategory, counter)

                print(query)
                cursor.execute(query, (category, answer, subcategory, counter))
                conn.commit()

# Close connection
#cursor.close()
#conn.close()

print("Category information updated successfully.")