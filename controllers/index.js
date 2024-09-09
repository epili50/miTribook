/** Crear un conjunto de funciones que van a dar respuesta a nuestras rutas  */

// Importamos el modelo
const Apartment = require('../models/apartment.model.js');
const Reservation = require('../models/reservation.model.js');

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
       


};

const searchApartments = async (req, res)=>{
   const { priceMax } = req.query
   console.log("🚀 ~ searchApartments ~ priceMax:", priceMax)
   
    // Obtenemos todos los apartamentos de la base de datos
   const apartments = await Apartment.find({ price: { $lte: req.query.priceMax } });

//    //Por si la query viene vacia
//    if(!priceMax){
//     apartments = await Apartment.find();

//     res.render('home', {
//         apartments   
//     });
// }




   res.render('home', {
        apartments
   });
}

const postNewReservation = async (req, res) => {
    const {idApartment, email, startDate, endDate} = req.body;

    const apartment = await Apartment.findById(idApartment);

    await Reservation.create({
        email, 
        startDate, 
        endDate,
        apartment
    })
};

module.exports = {
    getApartments,
    getApartmentById,
    searchApartments,
    postNewReservation
}