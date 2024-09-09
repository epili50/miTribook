const { Schema, model } = require("mongoose");

// Your code here ...
const apartmentSchema = new Schema({ 
    title:{
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },
    

    price:{
        type: Number,
        required: true
    },

    size:{
        type: Number, 
        min: 0
    },

    mainPhoto:{
        type: String,
        required: true
        // TODO Luego sacar el require y poner que se por defecto la primera del array de fotos
    },

    services:{
        type:[String],
        enum: ['Wifi', 'Aire Acondicionado', 'Calefacción', 'TV', 'Cocina', 'Servicio para Discapacitados']
    }, 

    // services:{
    //     wifi: Boolean,
    //     airConditioner: Boolean,
    //     kitchen: Boolean,
    //     disability: Boolean,
    //     heater: Boolean,
    //     tv: Boolean
    // }


})

const Apartment = model("Apartment", apartmentSchema);

module.exports = Apartment;