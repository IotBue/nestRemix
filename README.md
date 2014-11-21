=================
Nest Remix
=================
![Nest original](http://cdn.slashgear.com/wp-content/uploads/2014/03/nest_thermostat_insteon-800x420.jpg)

Nest Remix is a open source project developed to teach with a little first project about Internet of Things.
Este proyecto se realizó como eje de los contenidos para el primer taller del Meetup de Internet of Things en Buenos Aires. 

Equipo:
el objetivo de este prototipo es tener:
* a) conectar arduino con los sensores y visualizarlos en el Serial Console con Serial.println()
* b) conectar arduino con node y visualizar los datos crudos en un html local
* c) conectar arduino con node y visualizar los datos en Heroku
* d) conectar arduino con node y visualizar los datos en Heroku con D3.js y guardando en MongoDB
* e) conectar arduino con node, levantar data geolocalizada de Weather Channel API y visualizar la comparación
* f) conectar arduino con node, API, e ir seteando nuestra preferencia de temp
* g) conectar arduino con node, API, setear nuestra preferencia de temp y actuar sobre arduino con Relé


Este remix que proponemos recorre diferentes estadios de sensado y conectividad para llegar desde una unidad simple de medición de temperatura hasta un sistema inteligente de medición y control de hardware conectado a una base de datos que guarda las preferencias y contrapone contra la API de Weather Channel para establecer coeficientes de temperatura y disminuir las diferencias.

Pasaremos del funcionamiento de una placa Arduino y recibir en nuestra computadora el valor de temperatura del sensor DHT11, agregando luego la conexión a una página web local que muestre estos valores, avanzaremos en la implementación de una gráfica en D3.js para visualizar en tiempo real, y luego finalizaremos nuestra implementación en un servicio on line (Heroku) para tener control de nuestro dispositivo conectado por cable de red a internet.


### Version
0.0.1


Requerimientos
==============

### Materiales

* Noteboook
* Placa Arduino y cable usb
* Shield Arduino Ethernet R2 o R3
* Sensor de temperatura y humedad DHT11 o DHT22 (En este taller utilizaremos DHT11)
* Sensor de presión barométrica BMP180
* Cables de conexión pines macho

### Software

Nuestro proyecto utiliza diferentes proyectos y frameworks de código abierto

* [Node.js]
* [Express]
* [Bower]
* [MongoDB]
* [Arduino]
* [Heroku]
* [Weather API]


### To Do
- Update Documentation
- Create slides
- Create Graphics and schematics

Reference
=========

* [Smart Citizen Kit] 

Smart Citizen kit es un proyecto surgido del Fab Lab Barcelona por Tomás Diez, acelerado a través de crowdfunding en [Kickstarter]. El SCK es un dispositivo compuesto por una placa basada en Arduino y un shield con sensores de luz, sonido, temperatura, humedad, Dióxido de nitrógeno y Monóxido de carbono. Además tiene conectividad wifi y slot para colocar una batería de litio para ser totalmente autónomo.
En el sitio de Smart Citizen Kit se pueden visualizar en un mapa en tiempo real todos los sensores activos y los valores.

* [Nest Thermostat]

Producto comprado por Google en $3.2 millones de dólares, es un dispositivo que controla la temperatura del hogar y reemplaza el típico termostato, que es un producto utilizado en la mayoría de los hogares en Estados Unidos.
La particularidad de este termostato es que puede controlarse de forma remota por web o una aplicación mobile, y además va "aprendiendo" cómo se modifica la temperatura, y luego de un par de días de uso se regula de forma automática para optimizar el consumo de energía y ajustarse a las preferencias de cada hogar.


Instalación
===========

* Agregar paso a paso y comandos



Authors
=======
* [Javier Velazquez Traut] y [Sebastián Freijo] de [CRAN.IO]
* [Patagonia Tec]
* [Martín Rabaglia]
* [Cristian Reynaga] de [IoTBue]
* [IoTBue]



License
=======

Free to use and specially free to teach!

**Enjoy, learn and collaborate!**


[AngularJS]: http://angularjs.org
[Javier Velazquez Traut]: http://cran.io
[Sebi]: http://cran.io
[CRAN.IO]: http://cran.io
[Patagonia Tec]: http://patagoniatecnology.com
[Martín Rabaglia]: http://twitter.com/sr_humo
[Cristian Reynaga]: http://cristianreynaga.com
[IoTBue]: http://www.meetup.com/IoT-Buenos-Aires/
[Node.js]: http://nodejs.org
[Express]: http://expressjs.com
[Bower]: http://bower.io
[Arduino]: http://arduino.cc
[MongoDB]: http://mongodb.org
[Heroku]: http://heroku.com
[Weather API]: http://www.wunderground.com/
[Nest Thermostat]: http://nest.com
[Smart Citizen Kit]: https://www.smartcitizen.me/
