int pulseOutputPin = LED_BUILTIN;
int debugOutputPin = 12;


void setup() {
  // start serial port at 9600 bps and wait for port to open:
  Serial.begin(9600);
  while (!Serial) {
    ;  // wait for serial port to connect. Needed for native USB port only
  }
  pinMode(pulseOutputPin, OUTPUT);
  pinMode(debugOutputPin, OUTPUT);
  digitalWrite(pulseOutputPin, LOW);   // Set the output pin LOW
  digitalWrite(debugOutputPin, LOW);
  establishContact();  // send a byte to establish contact until receiver responds
}

void loop() {
  if (Serial.available() > 0) {
    int inByte = Serial.read();  // Read incoming byte from serial

    if (inByte == 'a') {
      // Send response byte 'b' back through serial
      Serial.write('b');

      // Generate a 3.3V pulse on the output pin for 2 seconds
      digitalWrite(pulseOutputPin, HIGH);  // Set the output pin HIGH
      digitalWrite(debugOutputPin, HIGH);
      delay(2000);                         // Delay for 2 seconds (2000 milliseconds)
      digitalWrite(pulseOutputPin, LOW);   // Set the output pin LOW
      digitalWrite(debugOutputPin, LOW);
    }
  }
}

void establishContact() {
  while (Serial.available() <= 0) {
    Serial.println("Serial connection has not been established.");  // send an initial string
    delay(300);
  }
}

