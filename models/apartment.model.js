const { Schema, model } = require("mongoose");

// Your code here ...
const apartmentSchema = new Schema({ 
    title:{
        type: String,
        require: true
    },

    price:{
        type: Number,
        require: true
    },

    size:{
        type: Number, 
        min: 0
    },

    mainPhoto:{
        type: String,
        require: true
        // TODO Luego sacar el require y poner que se por defecto la primera del array de fotos
    },

    services:{
        wifi: Boolean,
        airConditioner: Boolean,
        kitchen: Boolean,
        disability: Boolean,
        heater: Boolean,
        tv: Boolean
    }


})

const Apartment = model("Apartment", apartmentSchema);

module.exports = Apartment;