// ---------------------------------------------------------------------------
// Ejemplo de la Libreria NewPing para el uso de un sensor ultrasonico
// ---------------------------------------------------------------------------

#include <NewPing.h>

#define TRIGGER_PIN  12  // Pin del arduino conectado al Trigger del sensor ultrasonico
#define ECHO_PIN     11  // Pin del arduino conectado al Echo del sensor ultrasonico
#define MAX_DISTANCE 200 // Maxima distancia que vamos a esperar del sensor medida en cm. la maxima distancia que soporta el sensor esta entre 400 y 500 cm.

NewPing sonar(TRIGGER_PIN, ECHO_PIN, MAX_DISTANCE); // Creamos un objeto NewPing y le informamos a la libreria que pines va a utilizar el objeto.

void setup() {
  Serial.begin(115200); // Inicializamos el puerto serie a una velocidad de 115200 baudios.
}

void loop() {
  delay(50);                      // Esperamos 50 ms entre pings (aproximadamente unos 20 pings por segundo) 29ms deberia ser el tiempo minimo entre lectura y lectura.
  unsigned int uS = sonar.ping(); // Realizamos un ping con el sensor y lo almacenamos en el entero uS (microsegundos)
  Serial.print("Ping: ");         // Imprimimos Ping: en el puerto serie
  Serial.print(uS / US_ROUNDTRIP_CM); // convertimos la variable uS (que tiene el tiempo que tardo el ping en ir y volver) a cm, y lo imprimimos por el puerto serie.
  Serial.println("cm");
}
