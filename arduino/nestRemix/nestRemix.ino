#include <SPI.h>
#include <Ethernet.h>
#include <SFE_BMP180.h>
#include <Wire.h>
#include "DHT.h"

#define DHTPIN 2
#define DHTTYPE DHT11

SFE_BMP180 BMP;
DHT dht(DHTPIN, DHTTYPE);

byte mac[] = { 0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED };
unsigned int port = 80;
String server = "nest-remix.herokuapp.com";
String path = "/api/v1/stats";
float time=0.0f;
#define TIMER_DELAY 5.0f
float timer=TIMER_DELAY;

IPAddress ip(192,168,0,177);

EthernetClient client;

char Status;
double T1,P; //BMP180
double T2,H; //DHT11
String DeviceID = "arduino20";

void setup() {
  Serial.begin(115200);
  BMP.begin();
  dht.begin();
  while (!Serial) {
  }

  if (Ethernet.begin(mac) == 0) {
    Serial.println("Failed to configure Ethernet using DHCP");
    Ethernet.begin(mac, ip);
  }
  // give the Ethernet shield a second to initialize:
  delay(1000);
  Serial.println("connecting...");

  // if you get a connection, report back via serial:
  if (client.connect(server.c_str(), port)) {
    Serial.println("connected");
  } 
  else {
    // kf you didn't get a connection to the server:
    Serial.println("connection failed");
  }
  
  time=millis()/1000.0f;
}

void loop()
{
  float t = millis()/1000.0f;
  float dt = t - time;
  time = t; 
  // if there are incoming bytes available 
  // from the server, read them and print them:
  if(client.available()){
    String response="";
    while(client.available()){
      response+=(char)client.read();
    }
    //Serial.println(response);
    parsearMensaje(response.c_str(),response.length());
    timer=TIMER_DELAY;
  }
  
  if(timer>0.0f){
    timer-=dt;
    if(timer<=0.0f){
      leerSensores();
      //JSON: {"deviceId":"DeviceID","temp":"T","humidity":"H","pressure":"P"}
      String body = "{\"deviceId\":\"";
      body += DeviceID;
      body += "\",\"temp\":\"";
      body += T1;
      body += "\",\"humidity\":\"";
      body += H;
      body += "\",\"pressure\":\"";
      body += P;
      body += "\"}";
      Serial.print("Posteo: ");
      Serial.println(body);
      postearMensaje(body.c_str(),body.length());
    }
  }
  
  // if the server's disconnected, stop the client:
  if (!client.connected()) {
    Serial.println();
    Serial.println("disconnecting.");
    client.stop();
    
    // do nothing forevermore:
    delay(10000);
    setup();
  }
}

void leerSensores() {
  Status = BMP.startTemperature();
  if (Status != 0)
    delay(Status);
    BMP.getTemperature(T1);
      Status = BMP.startPressure(3);
    if (Status != 0)
      {
        delay(Status);
        BMP.getPressure(P,T1);
      }
  T2 = dht.readTemperature();
  H = dht.readHumidity();  
}

void postearMensaje(const char * body, unsigned int len) {
  // Make a HTTP request:                     
  client.print("POST ");
  client.print(path);
  client.println(" HTTP/1.1");
  client.print("Host: ");
  client.println(server);
  client.println("Connection: keep-alive");
  client.println("Content-Type: application/json");
  client.print("Content-Length: ");
  client.println(len);
  client.println();
  client.println(body);  
}

void parsearMensaje(const char * response, unsigned int len) {
    for(int i=0;i<len;i++){
      if(response[i]=='"' && response[i+1]=='/'){
        int j=i+2;
        String str="";
        while(response[j]!='"')
          str+=response[j++];
        Serial.print("Recibo: ");
        Serial.println(str);
        if(str.equals("COLD")){
          //PRENDO FRIO
          //APAGO CALOR
        }
        else if(str.equals("WARM")){
          //PRENDO CALOR
          //APAGO FRIO
        }
        else{
          //APAGO FRIO
          //APAGO CALOR
        }
        return;
      }
    }
}

