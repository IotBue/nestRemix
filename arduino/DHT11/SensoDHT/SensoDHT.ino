// Ejemplo de uso de la libreria DHT, para un sensor DHT11.

#include "DHT.h" // Incluimos la libreria DHT a este sketch

#define DHTPIN 2     // definimos en que pin vamos a conectar el sensor.

#define DHTTYPE DHT11   // Definimos que tipo de sensor es el que vamos a conectar, puede ser DHT11, DHT22, DHT21.


DHT dht(DHTPIN, DHTTYPE); // Creamos un objeto llamado dht y le asignamos el pin que vamos a usar y el tipo de sensor que es.

void setup() {
  Serial.begin(9600);     // inicializamos el puerto serie.
  Serial.println("DHTxx test!");
 
  dht.begin();            //inicializamos el sensor.
}

void loop() {
  float h = dht.readHumidity();     //Creamos la variable h y le guardamos el valor de la humedad que leemos del sensor.
  float t = dht.readTemperature();  //creamos la variable t y le guardamos el valor de la temperatura que leemos del sensor.

  // chequeamos los valores que recibimos para testear que son numeros ( la funcion isnan se traduce como "si no es un numero"), esta consulta retorna verdadero si no es un numero.
  // por ende si alguno de los dos valores que guardamos en las variables t y h, no son numeros, el programa nos imprime un mensaje de error.
  if (isnan(t) || isnan(h)) {
    Serial.println("Failed to read from DHT");
  } else {
    //si las dos variables son valores numericos, la imprimimos en el puerto serie.
    Serial.print("Humidity: "); 
    Serial.print(h);
    Serial.print(" %\t");
    Serial.print("Temperature: "); 
    Serial.print(t);
    Serial.println(" *C");
  }
}
