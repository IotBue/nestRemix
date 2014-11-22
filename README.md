=================
Nest Remix
=================

Nest Remix is a open source project developed to teach with a little first project about Internet of Things.
Este proyecto se realizó como eje de los contenidos para el primer taller del Meetup de Internet of Things en Buenos Aires. 

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
* Sensor de temperatura y humedad DHT11
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


Setup
=========

### Node.Js

El servidor que nuclea toda la actividad y comunicacion entre Arduino y el Frontend esta construido utilizando NodeJS. Para usarlo tenes que bajarte Node.js de la pagina oficial y elegi la mejor version para tu maquina. [Node.js]

### Mongo DB
Bajate mongodb y elegi la mejor version para tu maquina.[MongoDB]

### Como empezar?

* Inicia el servicio de mongodb. Por default podes hacerlo en la carpeta del package de mongodb y ejecutando: 
```bash
$  mongod --dbpath={carpetaDb}
```
donde {carpetaDb} es una carpeta donde mongo va a guardar el archivo de base de datos.

* Instala todas las librerias. Utilizando el comando

```bash
$ npm install
```
 en la carpeta principal del repositorio.  



* Inicia el servidor nodejs utilizando el comando 'node app.js'.

```bash
$  node app.js
```

* Configura tu arduino para que apunte a la direccion ip de tu maquina y asignale un nombre unico.

* Abri tu navegador en 'http://localhost:3000' y navega los distintos ejemplos.


Referencias
=========
### Productos


* [Smart Citizen Kit] 

Smart Citizen kit es un proyecto surgido del Fab Lab Barcelona por Tomás Diez, acelerado a través de crowdfunding en [Kickstarter]. El SCK es un dispositivo compuesto por una placa basada en Arduino y un shield con sensores de luz, sonido, temperatura, humedad, Dióxido de nitrógeno y Monóxido de carbono. Además tiene conectividad wifi y slot para colocar una batería de litio para ser totalmente autónomo.
En el sitio de Smart Citizen Kit se pueden visualizar en un mapa en tiempo real todos los sensores activos y los valores.

* [Nest Thermostat]

Producto comprado por Google en $3.2 millones de dólares, es un dispositivo que controla la temperatura del hogar y reemplaza el típico termostato, que es un producto utilizado en la mayoría de los hogares en Estados Unidos.
La particularidad de este termostato es que puede controlarse de forma remota por web o una aplicación mobile, y además va "aprendiendo" cómo se modifica la temperatura, y luego de un par de días de uso se regula de forma automática para optimizar el consumo de energía y ajustarse a las preferencias de cada hogar.

* [Evrythng]

EVRYTHNG provides a range of managed applications to help make products smart. This opens up consumer engagement opportunities and makes operations smarter at different stages in the lifecycle of how products are made, sold and used.


### Blogs

* [Postscapes]

* [Net of everything]

* [IoT Resources]


### Bibliografía

* [The epic struggle of the Internet of Things, Bruce Sterling]

* [The Internet of Things. How the Next Evolution of the Internet Is Changing Everything]

* [IoT Report, Goldman Sachs]

* [Career Watch: Internet of Things]

* [The Internet of Things and Wearable Technology, Adam Thierer]


Instalación
===========

'''sh
npm install
'''



Authors
=======
* [Javier Velazquez Traut] y [Sebastián Freijo] de [CRAN.IO]
* [Iván Fardjoume] y [Martín Lobato] de [Patagonia Tec]
* [Martín Rabaglia] de [R/GA Buenos Aires]
* [Cristian Reynaga] de [IoTBue]
* [IoTBue]


License
=======

Free to use and specially free to teach!

**Enjoy, learn and collaborate!**


[AngularJS]: http://angularjs.org
[Javier Velazquez Traut]: http://cran.io
[Sebastián Freijo]: http://cran.io
[CRAN.IO]: http://cran.io
[R/GA]: http://www.rga.com
[Iván Fardjoume]: http://patagoniatecnology.com 
[Martín Lobato]: http://patagoniatecnology.com
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
[Evrythng]: https://evrythng.com/
[Postscapes]: http://postscapes.com/
[Net of everything]: http://netofeverything.blogspot.com.ar/
[The epic struggle of the Internet of Things, Bruce Sterling]: http://www.amazon.com/The-Epic-Struggle-Internet-Things-ebook/dp/B00N8AIFYC
[The Internet of Things. How the Next Evolution of the Internet Is Changing Everything]:http://www.cisco.com/web/about/ac79/docs/innov/IoT_IBSG_0411FINAL.pdf
[IoT Report, Goldman Sachs]: http://www.goldmansachs.com/our-thinking/outlook/internet-of-things/iot-report.pdf
[Career Watch: Internet of Things]: http://www.pmi.org/~/media/PDF/Professional-Development/Career-Watch-Internet-of-Things.ashx
[The Internet of Things and Wearable Technology, Adam Thierer]: http://mercatus.org/sites/default/files/Thierer-Wearable-Tech.pdf
[IoT Resources]: http://postscapes.com/internet-of-things-resources/
