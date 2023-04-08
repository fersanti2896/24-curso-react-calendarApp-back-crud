
/* Configurando Express */
const express = require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config();
const cors = require('cors')

/* Creando el servidor de Express */
const app = express();

/* Cargando la base de Datos */
dbConnection();

/* Coors */
app.use(cors());

/* Directorio público */
app.use( express.static('public') );

/* Lectura y parseo del body */
app.use( express.json() );

/* Rutas */
app.use( '/api/auth', require('./routes/auth') );
// TODO: CRUD: Eventos

/* Escuchando las peticiones */
app.listen( process.env.PORT, () => {
    console.log(`Servidor en puerto ${ process.env.PORT }`);
} );