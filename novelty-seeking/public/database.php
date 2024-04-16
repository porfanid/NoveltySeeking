<?php

// code to use sentry for error reporting
require __DIR__ . '/vendor/autoload.php';

\Sentry\init([
    'dsn' => 'https://d80d7a680edc3c5b3d270c0ef958fe6b@o238115.ingest.sentry.io/4506672208084992',
    // Specify a fixed sample rate
    'traces_sample_rate' => 1.0,
    // Set a sampling rate for profiling - this is relative to traces_sample_rate
    'profiles_sample_rate' => 1.0,
  ]);

// Function to parse .env file
function parseEnv($filePath)
{
    $lines = file($filePath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    $vars = [];

    foreach ($lines as $line) {
        if (strpos(trim($line), '#') === 0) {
            continue; // Skip comments
        }

        list($key, $value) = explode('=', $line, 2) + [NULL, NULL];

        if ($key !== NULL && $value !== NULL) {
            $vars[trim($key)] = trim($value);
        }
    }

    return $vars;
}

// Load environment variables from .env file
$envVars = parseEnv(__DIR__ . '/.env');

// Database connection parameters
$host = $envVars['DB_HOST'];
$database = $envVars['DB_DATABASE'];
$username = $envVars['DB_USERNAME'];
$password = $envVars['DB_PASSWORD'];

try {
    // Create a PDO connection
    $pdo = new PDO("mysql:host=$host;dbname=$database;charset=utf8mb4", $username, $password);

    // Set the PDO error mode to exception
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Check if the request is a POST request
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $_POST = json_decode(file_get_contents("php://input"),true);
        // Assuming you have received the data in the POST request
        $code = $_POST['code'];
        $id = $_POST['index'];
        $choice = $_POST['choice'];
        $category = $_POST['category'];
        $counter = $_POST['counter'];
        $quiz = $_POST['quiz'];
        $date = $_POST['date'];

        // Prepare and execute the SQL query to insert data
        $stmt = $pdo->prepare("INSERT INTO answer (code, id, choice, category, counter, quiz, date) VALUES (:code, :id, :choice, :category, :counter, :quiz, :date)");
        $stmt->bindParam(':code', $code);
        $stmt->bindParam(':id', $id);
        $stmt->bindParam(':choice', $choice);
        $stmt->bindParam(':category', $category);
        $stmt->bindParam(':counter', $counter);
        $stmt->bindParam(':quiz', $quiz);
        $stmt->bindParam(':date', $date);

        $stmt->execute();
        // You can handle the success or provide a response as needed
        echo "Success";
    } else {
        // Handle non-POST requests
        throw new Exception("You need to make a post request for this file to work");
    }

} catch (PDOException $e) {
    throw new Exception("Database error: " . $e->getMessage());
}
?>
