// Rutas "públicas" de la app
const express = require('express');
const router = express.Router();

// importamos todos los controladores de controllers/index.js
const indexControllers = require('../controllers/index');

// Router funciona igual que el "app" para crear los endpoints. Nos permite definir un conjunto arbitrario de rutas

//Home
router.get('/', indexControllers.homePage);

// Todos los apartamentos
router.get('/apartment', indexControllers.getApartments)

//ruta al endpoint /search para buscar apartments
router.get('/search', indexControllers.searchApartments);

// ruta dinámica para detalle del apartamento
router.get('/apartment/:idApartment', indexControllers.getApartmentById);

//ruta para reservar un apartamento
router.post('/apartment/new-reservation', indexControllers.postNewReservation);


// Tenemos que exportar estas rutas para que sean usadas en app.js
module.exports = router;