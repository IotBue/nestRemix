#include <SFE_BMP180.h>
#include <Wire.h>


SFE_BMP180 BMP;

char Status;
double T,P,p0,a;

void setup() {
  Serial.begin(115200);
  Serial.println("Inicializando");
  if (BMP.begin())
  {
    Serial.println("Inicalizacion OK");
  }
  else
  {
    Serial.println("Fallo");
    while(1);
  }
}
void loop() {
  Status = BMP.startTemperature();
  if (Status != 0)
    delay(Status);
    Status = BMP.getTemperature(T);
    if (Status != 0)
    {
      Serial.print("Temperatura: ");
      Serial.print(T,2);
      Serial.println(" Grados Centigrados");
      
      Status = BMP.startPressure(3);
      if (Status != 0)
      {
        delay(Status);
        Status = BMP.getPressure(P,T);
        if (Status != 0)
        Serial.print("Presion Absoluta: ");
        Serial.print(P,2);
        Serial.println(" MiliBares");
      }
    }    
  delay(2000);
}
