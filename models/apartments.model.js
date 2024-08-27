

const { Schema, model } = require("mongoose");

// Your code here ...
const apartmentSchema = new mongoose.Schema({ 
    title:{
        type: String,
        require: true
    },

    price:{
        type: Number,
        require: true
    },

    area:{
        type: Number
    },

    mainPhoto:{
        type: String,
        require: True
        // TODO: Luego sacar el require y poner que se por defecto la primera del array de fotos
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

const Apartment = model("apartment", apartmentSchema);

module.exports = Apartment;