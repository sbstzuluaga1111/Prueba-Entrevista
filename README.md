# Prueba-Entrevista
La aplicación de Lista de Tareas consta de un frontend en React y un backend en Node.js utilizando el framework Express.js. Este API proporciona operaciones CRUD (Crear, Leer, Actualizar, Eliminar) para gestionar tareas. Se almacenan las tareas en una base de datos.

Se Creo un servidor Express-js
Se ha implementado un servidor Express-js para gestionar las operaciones CRUD en la lista de tareas. El servidor escucha en un puerto específico para atender las solicitudes entrantes.

**Inico de Backend**
Primero se ingresa a la respectiva carpeta de proyecto:
```
cd bakend
```
Se instalan los recursos necesarios
```
npm i
```
Se inicia el programa
```
npm start
```
**Rutas:**

GET:
```
http://localhost:3000/leer/tareas

http://localhost:3000/leer/tareas/id

http://localhost:3000/leer/usuarios

http://localhost:3000/leer/usuarios/id
```

POST:
```
http://localhost:3000/crear/tarea

http://localhost:3000/crear/usuario
```

DELET:
```
http://localhost:3000/eliminar/tarea/id

http://localhost:3000/eliminar/usuario/id
```

PUT:
```
http://localhost:3000/actualizar/tarea/id

http://localhost:3000/actualizar/usuario/id
```


**Inicio de Frontend**

Primero se ingresa a la respectiva carpeta de proyecto:
```
cd frontend
```
Se instalan los recursos necesarios
```
npm i
```
Se inicia el programa
```
npm start
```

Para aclarar que se necesita primero iniciar el proyecto de backend para despues iniciar el frontend.

////////////////////////////////////////////////////////////////////////////////////////////////////

The Task List application consists of a React frontend and a Node.js backend using the Express.js framework. This API provides CRUD (Create, Read, Update, Delete) operations to manage tasks. Tasks are stored in a database.

An Express.js server has been created.
An Express.js server has been implemented to handle CRUD operations on the task list. The server listens on a specific port to handle incoming requests.

First, navigate to the respective project folder:
```
cd bakend
```
Install the necessary resources:
```
npm install
```
Start the program:
```
npm start
```
**Routes:**

GETS:
```
http://localhost:3000/leer/tareas

http://localhost:3000/leer/tareas/id

http://localhost:3000/leer/usuarios

http://localhost:3000/leer/usuarios/id
```

POST:
```
http://localhost:3000/crear/tarea

http://localhost:3000/crear/usuario
```

DELET:
```
http://localhost:3000/eliminar/tarea/id

http://localhost:3000/eliminar/usuario/id
```

PUT:
```
http://localhost:3000/actualizar/tarea/id

http://localhost:3000/actualizar/usuario/id
```

**Frontend Start**
First, navigate to the respective project folder:
```
cd frontend
```
Install the necessary resources:
```
npm install
```
Start the program:
```
npm start
```
To clarify, it is necessary to start the backend project first before starting the frontend.

