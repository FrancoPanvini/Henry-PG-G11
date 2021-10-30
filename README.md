# ADOGTAME

> Enlaces:

## [Deploy](https://adogtame.vercel.app)

## [Video Demo WEB](https://youtu.be/PbN0Yg7HvHg)

## [Video Demo APP móvil](https://youtu.be/9RtzlPIem2E)

#

## Objetivo

El objetivo de _Adogtame_ es conectar **animales en adopción/perdidos/encontrados** con **personas que buscan adoptar o que extraviaron a su mascota.** Además la aplicación es una herramienta para que **refugios de animales** puedan publicar su ubicación y horarios de visita, listar sus mascotas disponibles, organizar eventos y hasta compartir un enlace en el cual puedan recibir donaciones y apoyo comunitario.

La idea surge a partir de la falta de un sitio que nuclee estas necesidades: actualmente este tipo de información está esparcida en diferentes redes sociales, entonces una aplicación como _Adogtame_ facilita el proceso de darle un hogar a una mascota que lo necesita, y a encontrar mascotas extraviadas que necesitan urgentemente volver a sus casas.

Las publicaciones en _Adogtame_ funcionan a base de geolocalización, por lo que la búsqueda y filtrado de mascotas se ve particularmente mejorada, especialmente en el caso de mascotas extraviadas, ya que un usuario al postear una mascota en esta sección debe proporcionar la zona en donde se perdió el animal, facilitando la urgente búsqueda.

<!-- Faltaría agregar un apartado de la app móvil -->

> Vista de búsqueda por mapa, disponible para Mascotas en adopción, Mascotas extraviadas, y Refugios de animales.
> ![previewMapas](./Client/my-app/src/images/PreviewMapas.jpg)

<hr />

## Requerimientos

> Variables de entorno usadas:

### Archivo .env en carpeta /Api

`PORT=` Número de puerto en el que correrá la database <br />
`DB_USER=` Nombre de usuario de Postgres <br />
`DB_PASSWORD=` Contraseña del usuario de Postgres <br />
`DB_HOST=` 'localhost' <br />

### Archivo .env en carpeta /Client/my-app

`REACT_APP_MAPS_KEY=` Clave API de _Google Develop_ <br />
`REACT_APP_FIREBASE_KEY=` Clave API de _Firebase_ <br />

<br />

> Versiones de dependencias:

React: ^17.0.2<br />
Tailwindcss: ^2.2.16<br />
@React-google-maps/api: ^2.4.1<br />
Google-map-react: ^2.1.10<br />
@Material-ui/core: ^4.12.3<br />
Firebase: ^9.1.1<br />
Axios: ^0.21.4<br />
Dotenv: ^8.2.0<br />
Jsonwebtoken: ^8.5.1<br />
Libphonenumber-js: ^1.9.37<br />
Sweetalert: ^2.1.2<br />

<hr />

## Instrucciones

en carpeta /Api <br />
`npm install` → para instalar dependencias <br />
`npm start` → para levantar la base de datos <br />

en carpeta /Client/my-app <br />
`npm install` → para instalar dependencias <br />
`npm start` → para levantar la aplicación <br />

<hr />

## Tecnologías

- Javascript
- HTML
- CSS
- React
- React Native
- Redux
- TailwindCSS
- Material UI
- Node
- Express
- PostgreSQL
- Sequelize

<hr />

## _Autores_

### _David Mendoza Lopez_ { [LinkedIn](https://www.linkedin.com/in/davidmenlop/) | [Github](https://github.com/davidmenlop) | [Portfolio](https://portafolio-ivory.vercel.app) }

### _Franco Aparicio_ { [LinkedIn](https://www.linkedin.com/in/franco-aparicio) | [Github](https://github.com/ffranco-a) }

### _Franco Panvini_ { [LinkedIn](https://linkedin.com/in/franco-panvini) | [Github](https://github.com/FrancoPanvini) }

### _Santiago Petri_ { [LinkedIn](https://www.linkedin.com/in/santiagopetri/) | [Github](https://github.com/DonPepo) }

### _Lucas Chaves_ { [LinkedIn](https://www.linkedin.com/in/lucas-chaves-dev/) | [Github](https://github.com/LucasChaves12) }

### _Damian Luano Diego_ { [LinkedIn](https://www.linkedin.com/in/damianldiego/) | [Github](https://github.com/damldieg) | [Portfolio](https://damdiegdevfolio.netlify.app) }

<hr />

## Capturas

> Página de Adopciones
> ![Página de Adopciones](./Client/my-app/src/images/PreviewAdopciones.jpg)

> Formulario de posteo de Mascota en Adopción
> ![Formulario de posteo de Mascota en Adopción](./Client/my-app/src/images/PreviewPosteoMascota.jpg)

> Página de Perdidos
> ![Página de Perdidos](./Client/my-app/src/images/PreviewPerdidos.jpg)

> Pantalla de detalle de Mascota extraviada
> ![Pantalla de detalle de Mascota extraviada](./Client/my-app/src/images/PreviewDetallePerdido.jpg)

> Formulario de Registro
> ![Formulario de Registro](./Client/my-app/src/images/PreviewRegistro.jpg)

> Formulario de Inicio de sesión
> ![Formulario de Inicio de sesión](./Client/my-app/src/images/PreviewLogin.jpg)

> Pantalla de Perfil
> ![Pantalla de Perfil](./Client/my-app/src/images/Perfil.jpg)

> Página de Refugios de animales
> ![Página de Refugios](./Client/my-app/src/images/PreviewRefugios.jpg)

> Pantalla de detalle de Refugio
> ![Pantalla de detalle de refugio](./Client/my-app/src/images/PreviewDetalleRefugio.jpg)

> Página de Eventos organizados por Refugios de animales
> ![Página de Eventos organizados por Refugios de animales](./Client/my-app/src/images/PreviewEventos.jpg)
