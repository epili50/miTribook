// importar módulos de terceros
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');

const dotenv = require('dotenv');
dotenv.config();

// importar las rutas públicas
const indexRoutes = require('./routes/index.js');

// importar las rutas de administrador
const adminRoutes = require('./routes/admin.js');

// rutas de autentificación VER SI LO MANTENGO
const authRoutes = require('./routes/auth.js');

// creamos una instancia del servidor Express
const app = express();

// Tenemos que usar un nuevo middleware para indicar a Express que queremos procesar peticiones de tipo POST
app.use(express.urlencoded({ extended: true }));

// Configurar sesión
app.use(session({
    secret: 'miSecretoSuperSecreto',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // secure: true en producción con HTTPS
}));


// Vamos a pasar una variable a todas las vistas. Vamos a indicar si el usuario que está accediendo a la vista es de tipo administrador o no. Eventualmente, esta información debería proceder de una base de datos de usuario. Ahora mismo todas las rutas '/admin' se considera que accede un usuario de tipo adiministrador
app.use((req, res, next) => {
    // La variable req.locals es una variable "global" de tipo objecto a la que todas las vistas pueden acceder
    // Si el usuario esta autentificado entonces es que es de tipo administrador
    res.locals.isAdmin = req.session.isAuthenticated;

    //PAso la variable de fechas reservadas a todas las vistas
    res.locals.disabledDates = res.locals.disabledDates || [];

    res.locals.isAvailable = res.locals.isAvailable;

    // tenemos que ejecutar next() para que la petición HTTP siga su curso
    next();
});

    

// Añadimos el middleware necesario para que el client puedo hacer peticiones GET a los recursos públicos de la carpeta 'public'
app.use(express.static('public'));

const PORT = process.env.PORT || 3000;

// Especificar a Express que quiero usar EJS como motor de plantillas
app.set('view engine', 'ejs');

// Usamos el middleware morgan para loguear las peticiones del cliente
app.use(morgan('tiny'));

// Middleware para proteger las rutas de administrador
app.use('/admin', (req, res, next) => {
    // Miramos si el usuario esta autentificado
    if (req.session.isAuthenticated) {
        // Si es que si, establecemos que es de tipo administrador y permitimos que siga la petición
        res.locals.isAdmin = true;
        next();
    } else {
        // en caso contrario lo llevamos a la vista de login
        res.redirect('/login');
    }
});

// Añadimos las rutas de index.js en nuestra app
// El primer parámetro significa que todas las rutas que se encuentren en 'indexRouter' estarán prefijados por '/'
// Voy a prefijar todas las rutas de administrador con '/admin'
app.use('/admin', adminRoutes);
app.use(authRoutes);
app.use('/', indexRoutes);

async function connectDB() {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Conectado a la base de datos');
}

connectDB().catch(err => console.log(err))

app.listen(PORT, (req, res) => {
    console.log("Servidor escuchando correctamente en el puerto " + PORT);
});
