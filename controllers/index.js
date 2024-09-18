/** Crear un conjunto de funciones que van a dar respuesta a nuestras rutas  */

// Importamos el modelo
const Apartment = require("../models/apartment.model.js");
const Reservation = require("../models/reservation.model.js");

const homePage = async (req, res) => {
  // Obtenemos todos los apartamentos de la base de datos
  const apartments = await Apartment.find({ isAvailable: { $ne: false } });

    const cities = await getAllCities();
    console.log("🚀 ~ getApartments ~ cities:", cities)


  

  res.render("home", {
    apartments,
    cities
    
  });
};

const getApartments = async (req, res) => {
  // Obtenemos todos los apartamentos de la base de datos
  const apartments = await Apartment.find({ isAvailable: { $ne: false } });

    const cities = await getAllCities();
    console.log("🚀 ~ getApartments ~ cities:", cities)


  

  res.render("all-apartments.ejs", {
    apartments,
    cities
    
  });
};

const getApartmentById = async (req, res) => {
  const { idApartment } = req.params;

  //Buscarlo en la BBDD
  const selectedApartment = await Apartment.findById(idApartment);

  // Obtener todas las reservas de ese apartamento
  const reservations = await Reservation.find({ apartment: idApartment }).select("startDate endDate");

  // Generar el array de fechas deshabilitadas
  const getDisabledDates = (reservations) => {
    const disabledDates = [];
    reservations.forEach((reservation) => {
      let start = new Date(reservation.startDate);
      const end = new Date(reservation.endDate);
      while (start <= end) {
        disabledDates.push(start.toISOString().split("T")[0]);
        start.setDate(start.getDate() + 1);
      }
    });
    return disabledDates;
  };

  const disabledDates = getDisabledDates(reservations);

  //Para los que tienen como primera foto '$mainPhoto'
  selectedApartment.photos.forEach(photo => {
    if (photo.photo === '$mainPhoto') {
      photo.photo = selectedApartment.mainPhoto;
    }
  });



  //Renderizarlo
  res.render("detail-Apartment", {
    selectedApartment,
    disabledDates
  });
};

const searchApartments = async (req, res) => {

  const cities = await getAllCities();

  const { priceMax, priceMin, city } = req.query;
  
  const query ={
    isAvailable: { $ne: false },
  }

  // Si priceMin y priceMax están presentes, agregarlos a la consulta de precio
  if (priceMin || priceMax) {
    query.price = {};
    if (priceMin) query.price.$gte = priceMin;  // Precio mínimo
    if (priceMax) query.price.$lte = priceMax;  // Precio máximo
  }

  // Si se proporciona una ciudad, agregarla a la consulta
  if (city) {
    query.city = city;
  }

  

  // Obtenemos todos los apartamentos de la base de datos
  const apartments = await Apartment.find(query)



  res.render("home", {
    apartments,
    cities
  });
};

const getAllCities = async () =>{
  const apartments = await Apartment.find({ isAvailable: { $ne: false } });

  return cities = [...new Set(apartments.map(apartment => apartment.city))];

  
}

const postNewReservation = async (req, res) => {
  const { idApartment, email } = req.body;

  //extracción del rango de fechas
  const dateRange = req.body.dateRange;
  const [startDateStr, endDateStr] = dateRange.split(" to ");

  // Convertir las cadenas a objetos Date
  const [dayStart, monthStart, yearStart] = startDateStr.split("-");
  const [dayEnd, monthEnd, yearEnd] = endDateStr.split("-");

  const startDate = new Date(`${yearStart}-${monthStart}-${dayStart}`);
  const endDate = new Date(`${yearEnd}-${monthEnd}-${dayEnd}`);

  const apartment = await Apartment.findById(idApartment);

  // Creación de la nueva reserva

  await Reservation.create({
    email,
    startDate,
    endDate,
    apartment,
  });
  res.send("Apartamento reservado");
  return;
};

module.exports = {
  homePage,
  getApartments,
  getApartmentById,
  searchApartments,
  postNewReservation,
};
