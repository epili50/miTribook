/** Crear un conjunto de funciones que van a dar respuesta a nuestras rutas  */

// Importamos el modelo
const Apartment = require('../models/apartment.model.js');

const getApartments = async (req, res) => {

    // Obtenemos todos los apartamentos de la base de datos
    const apartments = await Apartment.find();

    res.render('home', {
        apartments
    });
}

const getApartmentById = async (req, res) =>{
    const { idApartment } = req.params;

    //Buscarlo en la BBDD
    const selectedApartment = await Apartment.findById(idApartment);

    //Renderizarlo
    res.render('detail-Apartment', {
        selectedApartment   
    });
        console.log("🚀 ~ getApartmentById ~ selectedApartment:", selectedApartment)


};

const searchApartments = async (req, res)=>{
   // Obtenemos todos los apartamentos de la base de datos
   const apartments = await Apartment.find({ price: { $lte: req.query.priceMax } });
   console.log("🚀 ~ searchApartments ~ req.body.priceMax:", req.query.priceMax)

   res.render('home', {
        apartments
   });
}


module.exports = {
    getApartments,
    getApartmentById,
    searchApartments
}