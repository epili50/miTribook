const Apartment = require("../models/apartment.model.js");

const getNewApartmentForm = (req, res) => {
  // Obtener todos los apartmentos de la base de datos
  const apartments = Apartment.find();

  res.render("new-apartment.ejs", {
    apartment: {},
  });
};

const getEditAparmentForm = async (req, res) => {
  // 1. Recuperar el apartmento identificado por su idApartment de la base de datos
  const { idApartment } = req.params;

  // 2. Ir a la base de datos y obtener el apartamento dada su id
  const apartment = await Apartment.findById(idApartment);
  
  // console.log(apartment.location.cordinates[0]);
  
  

  // 3. Pasar este apartmento a la vista para pre rellenar todos los campos
  res.render("new-apartment", {
    apartment,
  });
};

const postNewApartment = async (req, res) => {
  const { id, title, city, length, latitude, price, size, maxGuest, rooms, beds, bathrooms, mainPhoto, descriptionPhoto1, photo2, descriptionPhoto2, photo3, descriptionPhoto3, photo4, descriptionPhoto4, services, description, rules } = req.body;
  console.log("🚀 ~ postNewApartment ~ req.body:", req.body)
  const photos=[{
    photo:mainPhoto, 
    descriptionPhoto: descriptionPhoto1},
    
    {photo:photo2,
    descriptionPhoto: descriptionPhoto2},

    {photo3,
    descriptionPhoto: descriptionPhoto3},

    {photo4,
    descriptionPhoto: descriptionPhoto4},

  ]

  

  if (id) {
    await Apartment.findByIdAndUpdate(id, {
      title,
      city,
      location:{
        type:'Point',
        coordinates:[parseFloat(length) || 0, parseFloat(latitude) || 0]
      },
      price,
      size,
      maxGuest,
      rooms,
      beds,
      bathrooms,
      mainPhoto,
      photos,
      services,
      description,
      rules
    });
    res.send("Apartamento actualizado");
    return;
  }

  await Apartment.create({
    title,
    city,
    location:{
      cordinates:[parseFloat(length) || 0, parseFloat(latitude) || 0]
    },
    price,
    size,
    maxGuest,
    rooms,
    beds,
    bathrooms,
    mainPhoto,
    photos,
    services,
    description,
    rules
  });

  res.send("Apartamaneto creado");
};

module.exports = {
  getNewApartmentForm,
  postNewApartment,
  getEditAparmentForm,
};
