import mysql.connector

def select_from_codes(codes):
    try:
        # Connect to MySQL database
        connection = mysql.connector.connect(
            host="localhost",
            user="porfanid",
            password="metamule",
            database="exbragr_novelty_seeking"
        )

        cursor = connection.cursor()

        # Prepare SQL query
        query = "SELECT * FROM your_table WHERE code IN ({})".format(','.join(['%s']*len(codes)))

        # Execute the query
        cursor.execute(query, codes)

        # Fetch all the rows
        rows = cursor.fetchall()

        # Display the rows
        for row in rows:
            print(row)

    except mysql.connector.Error as error:
        print("Error while connecting to MySQL", error)

    finally:
        # Close database connection
        if connection.is_connected():
            cursor.close()
            connection.close()
            print("MySQL connection is closed")

# Example usage
codes_list = [357, 331]  # List of codes
select_from_codes(codes_list)
