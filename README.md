
# CRUD de Tarjetas - NestJS + Angular + MySQL

Este proyecto implementa un sistema CRUD (Crear, Leer, Actualizar, Eliminar) de tarjetas, utilizando **NestJS** para el backend, **Angular standalone** para el frontend y **MySQL** como base de datos. Incluye documentación con Swagger, logs automáticos y un `docker-compose.yml` para levantar todo el entorno con un solo comando.

---

## Tecnologías y herramientas usadas

- **Backend:** NestJS, TypeScript, MySQL2, dotenv, fs
- **Frontend:** Angular standalone, Bootstrap
- **Documentación:** Swagger (OpenAPI), Postman
- **Contenedores:** Docker y Docker Compose
- **Scripts auxiliares:** archivos `.bat` para iniciar y detener el proyecto sin Docker

---

## Estructura del repositorio

- `/tarjetas-backend`: Proyecto NestJS (API REST)
- `/tarjetas-frontend`: Proyecto Angular standalone
- `docker-compose.yml`: Orquestador para MySQL, backend y frontend
- `init.sql`: Script SQL para crear la base de datos y tabla `tarjetas`
- `start_tarjetas.bat` y `stop_tarjetas.bat`: Scripts para ejecutar o detener el proyecto sin Docker
- `tarjetas-crud.postman_collection.json` : Endpoints para testing local en postman
- `README.md`: esta documentación

---

## Ejecución con Docker

### 1. Se debe tener Docker y Docker Compose instalados.
### 2. Desde la raíz del proyecto:
```bash
docker compose up --build
```

Esto levantara:
- MySQL (con la base de datos `crud` y tabla `tarjetas` ya creada, mediante `init.sql` )
- Backend NestJS en el puerto `3000`
- Frontend Angular servido por Nginx en el puerto `4200`

---

## Instalación y ejecución con archivos .bat

### 1. Clona el repositorio:
```bash
git clone https://github.com/tu-usuario/tu-repo.git
```

### 2. Configurar la base de datos en MySQL local:
```bash
mysql -u root -p < init.sql
```
Esto creará la base de datos `crud` y la tabla `tarjetas`

Para poder ejecutarlo correctamente, el .env en el backend debe existir esta configuracion:

DB_HOST=localhost

DB_PORT=3306

DB_USER=root

DB_PASS=contrasena de su mysql local

DB_NAME=crud

### 3. Configurar el backend:
```bash
cd tarjetas-backend
npm install
```
Edita el archivo `.env` para que tenga la configuración local de MySQL.

### 4. Configurar el frontend:
```bash
cd ../tarjetas-frontend
npm install
```
### 5. Iniciar todo con el script:
```bash
start_tarjetas.bat
```
Y detenerlo con:
```bash
stop_tarjetas.bat
```
---

## Instalación y ejecución local sin Docker ni archivos .bat

### 1. Base de datos
Se debe tener MySQL corriendo. Luego ejecutar:
```bash
mysql -u root -p < init.sql
```
Esto creará la base de datos `crud` y la tabla `tarjetas`

Para poder ejecutarlo correctamente, el .env en el backend debe existir esta configuracion:

DB_HOST=localhost

DB_PORT=3306

DB_USER=root

DB_PASS=contrasena de su mysql local

DB_NAME=crud

### 2. Backend
```bash
cd tarjetas-backend
npm install
npm run start:dev
```

### 3. Frontend
```bash
cd tarjetas-frontend
npm install
ng serve
```

##  Endpoints 

- `GET /tarjetas` : listar tarjetas
- `POST /tarjetas` : crear tarjeta
- `PUT /tarjetas/:id` : actualizar tarjeta
- `DELETE /tarjetas/:id` : eliminar tarjeta
- `GET/tarjetas/reporte` : Devuelve `{ total, ultimoTitulo }` 

Swagger está disponible en: [http://localhost:3000/api](http://localhost:3000/api)

---

## Breve resumen de cómo se desarrolló el proyecto

Para el backend utilicé **NestJS** con TypeScript, que instalé globalmente con `npm i -g @nestjs/cli`. Luego generé el proyecto con `nest new`, y seguidamente creé el módulo, el controlador y el servicio con `nest g`. No utilicé un ORM, trabajé directamente con `mysql2` (lo instalé con `npm install mysql2`) y configuré la conexión a MySQL mediante un archivo `.env`, para lo cual fue necesario instalar dotenv con `npm install dotenv`. Centralicé la conexión en un archivo llamado `database.ts`. La ventaja de no usar un ORM es que tengo un control más claro sobre las queries y puedo manejar las transacciones manualmente con `beginTransaction`, `commit` y `rollback`. Esto me pareció positivo porque, si algo falla en medio de un insert, update o delete, se puede realizar un rollback sin problemas.

Luego implementé el service, donde coloqué la lógica del CRUD con los métodos `create`, `findAll`, `update` y `delete`. Como último paso en el backend, implementé el controller y allí definí cada endpoint necesario para el CRUD: `GET (Leer)`, `POST (Crear)`, `PUT (Editar)` y `DELETE (Eliminar)`. Además, instalé `@nestjs/swagger` para documentar la API. El log lo hice con `fs` de Node, para que cada vez que se crea, actualiza o elimina una tarjeta quede registrado en un archivo `activity.log`, el cual se encuentra en la carpeta `\tarjetas-backend\logs`. En el backend también añadí un **interceptor global** en NestJS que muestra en consola cuánto tarda cada petición y qué ruta se llamó. Esto lo decidí hacer porque me permite visualizar el rendimiento sin necesidad de usar `console.log` en todas partes del código.

Para el frontend preferí Angular standalone. Lo inicialicé con `ng new` y luego instalé `bootstrap` (`npm install bootstrap`) para los estilos, agregándolo también en el `angular.json` con `node_modules/bootstrap/dist/css/bootstrap.min.css`. Generé el service y el componente con `ng generate`, y en el service implementé el consumo de mi backend NestJS. Finalmente, edité el componente HTML junto con su TypeScript para que se viera bonito.

Pensando en facilitar la instalación, agregué varias opciones. Lo dockerice con un `docker-compose.yml` que levanta la base de datos, el backend y el frontend con un solo comando. Pero si no se desea utilizar Docker, cree dos scripts `.bat` que ejecutan y detienen el proyecto automáticamente en Windows.

En resumen, construí este proyecto de la siguiente forma: primero instalé cada dependencia con `npm install`, luego desarrollé el backend con NestJS y el frontend con Angular y Bootstrap, conecté ambos mediante servicios HTTP, añadí logs e interceptores y, como extra, lo dockericé y creé los scripts `.bat` para que cualquiera pueda probarlo sin complicaciones.

---

## Contacto

-Desarrollado por Ana Rivera

-Email: [ana.rivera2023@gmail.com](mailto:ana.rivera2023@gmail.com)

--- 
