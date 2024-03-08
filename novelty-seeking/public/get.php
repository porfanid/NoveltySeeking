<?php

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


$valid_tokens = ['xWi5tHFb5X4Scwp9pP4dX6hSSnXbdZqjJ9rBjEpfj9jXSkjFj5DKqL5uik4WKwS'];
$provided_token = isset($_SERVER['HTTP_AUTHORIZATION']) ? trim(str_replace('Bearer', '', $_SERVER['HTTP_AUTHORIZATION'])) : null;

if (!in_array($provided_token, $valid_tokens)) {
    header('HTTP/1.0 401 Unauthorized');
    echo 'Access Denied';
    exit;
}


// Load environment variables from .env file
$envVars = parseEnv(__DIR__ . '/.env');

// Database connection parameters
$host = $envVars['DB_HOST'];
$database = $envVars['DB_DATABASE'];
$username = $envVars['DB_USERNAME'];
$password = $envVars['DB_PASSWORD'];

try {
    // Get the code from the URL parameters
    $code = $_GET['code'];

    // Create a PDO connection
    $pdo = new PDO("mysql:host=$host;dbname=$database;charset=utf8mb4", $username, $password);

    // Set the PDO error mode to exception
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Prepare and execute the SQL query to retrieve data based on the code
    $stmt = $pdo->prepare("SELECT * FROM answer WHERE code = :code and choice is not NULL and quiz is not NULL");
    $stmt->bindParam(':code', $code);
    $stmt->execute();

    // Fetch the result as an associative array
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Print the result as JSON
    echo json_encode($result, JSON_PRETTY_PRINT);

} catch (PDOException $e) {
    // Handle database connection errors or query execution errors
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
}
?>
