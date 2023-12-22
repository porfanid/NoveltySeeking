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

    // You are now connected to the database!

    // You can perform database operations here

    // For example, fetch all rows from a table named 'example_table'
    $stmt = $pdo->prepare("SELECT * FROM answer;");
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Print the result
    print_r($result);
} catch (PDOException $e) {
    // Handle database connection errors
    echo "Connection failed: " . $e->getMessage();
}
?>
