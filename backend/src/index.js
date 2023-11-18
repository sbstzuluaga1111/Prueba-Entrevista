require('dotenv').config({ path: './src/.env' });
const express = require('express');
const connectDB = require('./db');

const getRoutes = require('./routes/get.routes.js');
const postRoutes = require('./routes/post.routes.js');
const deleteRoutes = require('./routes/delet.routes.js');
const updateRoutes = require('./routes/update.routes.js');

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

// Llamado de rutas GET
app.use('/leer', getRoutes);

// Llamado de rutas POST
app.use('/crear', postRoutes);

// Llamado de rutas DELETE
app.use('/eliminar', deleteRoutes);

// Llamado de rutas PUT
app.use('/actualizar', updateRoutes);

// Llamado de conexión a la base de datos
connectDB();

app.listen(port, () => console.log('Listening on port:', port));
