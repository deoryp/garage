int led = 4;

void setup() {
  pinMode(led, OUTPUT); 
  digitalWrite(led, LOW);  
  
  Serial.begin(9600);
  Serial.write("Power On\n");
}

//
// Comp method ref: http://forum.arduino.cc/index.php/topic,45629.0.html
//
char inData[20];
char inChar=-1;
byte index = 0; 

char Comp(char* This) {
  while (Serial.available() > 0) {
    if(index < 19) {
      inChar = Serial.read(); // Read a character
      inData[index] = inChar; // Store it
      index++; // Increment where to write next
      inData[index] = '\0'; // Null terminate the string
    }
  }
  if (strcmp(inData,This)  == 0) {
    for (int i=0;i<19;i++) {
      inData[i]=0;
    }
    index=0;
    return(0);
  } else {
    return(1);
  }
}

void loop() {
  if (Comp("toggle\n") == 0) {
    toggleDoor();
  }
}

void toggleDoor() {
  Serial.println("Toggling Door...");
  
  digitalWrite(led, HIGH);
  delay(1000);
  digitalWrite(led, LOW);
  
  Serial.println("Sleep for Safty...");
  
  int i = 5;
  while (i --> 0) {
    Serial.println(i);
    delay(1000);
  }
  Serial.write("Ready.\n");
  
}
