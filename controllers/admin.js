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

  // 3. Pasar este apartmento a la vista para pre rellenar todos los campos
  res.render("new-apartment", {
    apartment,
  });
};

const postNewApartment = async (req, res) => {
  const { id, title, description, price, size, mainPhoto, services } = req.body;
  console.log("🚀 ~ postNewApartment ~ req.body:", req.body)

  if (id) {
    await Apartment.findByIdAndUpdate(id, {
      title,
      description,
      price,
      size,
      mainPhoto,
      services
    });
    res.send("Apartamento actualizado");
    return;
  }

  await Apartment.create({
    title,
    description,
    price,
    size,
    mainPhoto,
    services
  });

  res.send("Apartamaneto creado");
};

module.exports = {
  getNewApartmentForm,
  postNewApartment,
  getEditAparmentForm,
};
