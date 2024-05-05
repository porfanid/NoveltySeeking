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
$valid_token = $envVars['VALID_TOKEN'];

try {
    // Create a PDO connection
    $pdo = new PDO("mysql:host=$host;dbname=$database;charset=utf8mb4", $username, $password);

    // Set the PDO error mode to exception
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Check if the request is a POST request
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $_POST = json_decode(file_get_contents("php://input"),true);
        // Get the data from the POST request
        $code = $_POST['code'];
        $id = $_POST['index'];
        $answer = $_POST['answer'];

        $token = $_POST['token'];
        if($token!==$valid_token){
            throw new Exception("Invalid token");
        }


        // Prepare and execute the SQL query to insert data
        $stmt = $pdo->prepare("INSERT INTO questioner (code, id, answer) VALUES (:code, :id, :answer)");
        $stmt->bindParam(':code', $code);
        $stmt->bindParam(':id', $id);
        $stmt->bindParam(':answer', $answer);


        $stmt->execute();
        // You can handle the success or provide a response as needed
        echo "Success";
    } else {
        // Handle non-POST requests
        echo "error";
    }

} catch (PDOException $e) {
    // Handle database connection errors or query execution errors
    echo "Error2".$e.PHP_EOL;
    var_dump($_POST);
}
?>
