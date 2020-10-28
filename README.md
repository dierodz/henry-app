<p align='left'>
    <img src='https://static.wixstatic.com/media/85087f_0d84cbeaeb824fca8f7ff18d7c9eaafd~mv2.png/v1/fill/w_160,h_30,al_c,q_85,usm_0.66_1.00_0.01/Logo_completo_Color_1PNG.webp' </img>
</p>

## BoilerPlate

El boilerplate cuenta con dos carpetas: `api` y `client`. En estas carpetas estará el código del back-end y el front-end respectivamente.

En `api` vas a tener que crear un archivo llamado: `.env` que tenga la siguiente forma:

```
DB_USER=usuariodepostgres
DB_PASSWORD=passwordDePostgres
DB_HOST=localhost
DB_NAME=henryapp
PORT=3001
```

Tenés que reemplazar `usuariodepostgres` y `passwordDePostgres` con tus propias credenciales para conectarte a postgres. Este archivo va ser ignorado por github, ya que contiene información sensible (las credenciales).

El contenido de `client` fue creado usando: Create React App.

### Directorios básicos Back-end (API)
````
src: donde se encuentra todo el código
  |-- controllers: todos los controladores para las rutas
  |-- middlewares: 
  |-- models: definición de todos los modelos para la bd
  |-- routes: definición de todas las rutas del proyecto
  app.js: configuración inicial de la aplicación
  db.js: configuración inicial de la bd
  index.js: arranque de la aplicación
````
### Directorios básicos Front-end (CLIENT)
````
src: donde se encuentra todo el código
  |-- actions: definición de las acciones para la store (redux)
  |-- components: definición de componentes individuales para la aplicación
  |-- dispatchers: definición de ejecutores de las acciones
  |-- hooks: definición de hooks personalizados
  |-- pages: definición de componentes pages (screen) de la aplicacion
  |-- reducers: definición de los reducers
  |-- routers: definición de componentes routers de la aplicación
  |-- services: definición de servicios para la aplicación
  |-- types: definición de todos los tipos de dispatchers para la store
  |-- styles: definición de estilos  
        |-- base: estilos principales
        |-- components: estilos de componentes individuales
        |-- pages: estilos de componentes pages individuales
````
 
# MIS DATOS .ENV

## API
DB_USER=postgres
DB_PASSWORD=password
DB_HOST=localhost
DB_NAME=henryapp
PORT=3001
API=http://localhost:3001
CALLBACK_URL_BASE=http://localhost:3000
SECRET=secretString
GOOGLE_CLIENT_ID=673167318191-gj1jnrkak2o41iagst0cbs25ig75vma7.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=0KD85N4VYKGNaRYZ7O9AA6V1
GITHUB_APP_ID=df6e7ee66a040ab4df83
GITHUB_APP_SECRET=137fdb71729cc95537401bb1ebde92de2717c58d
MAILGUN_API_KEY=470e5443f31dbabfba1b7a3a6df9a490-cb3791c4-65cef2fc
MAILGUN_DOMAIN=mail.gardenry.shop


## CLIENT
REACT_APP_API=http://192.168.1.61:3001

## PAPER
<!-- # REACT_APP_API_REMOTE=http://api.gardenry.shop:3002 -->
ANDROID_OAUTH_CLIENT=80624130355-2ejfuk9es2ncdal1enjuspmuscufhq51.apps.googleusercontent.com
REACT_APP_API_REMOTE=http://192.168.1.61:3001
SW_APP_API_REMOTE=ws://192.168.1.61:3001/graphql