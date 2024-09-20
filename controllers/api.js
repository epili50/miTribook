const Apartment = require("../models/apartment.model.js");

const getApartments = async (req, res) => {
    // 1. Ir al modelo y obtener todos los apartamentos (hasta 100000) <- TODO

    if(req.query.limit < 0 || req.query.limit > 0){
        return res.status(400).json({
            message: "error"
        });
    }
    
    let queryLimit = req.query.limit || 100000;


    const apartments = await Apartment.find().limit(queryLimit);

    // 2. Devolver una respuesta
    res.status(200).json({
        message: "Query executed successfully",
        results: apartments // TODO: Completar con todos los apartmentos de la base de datos
    })
}

module.exports = {
    getApartments
}