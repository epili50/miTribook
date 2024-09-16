const { Schema, model } = require("mongoose");

// Your code here ...
const apartmentSchema = new Schema({ 
    title:{
        type: String,
        required: true
    },

    city: {
        type: String,
        required: true
    },
    location: {
      type: {
        type: String,  // Será un tipo 'Point'
        enum: ['Point'], // Debe ser 'Point'
        default: 'Point'
      },
      coordinates: {
        type: [Number], // Array de números: [length, latitude,],
        default: [0, 0],
        
      }
    },

    beds:{
        type: Number,
        required: true
    },

    bathrooms:{
        type: Number,
        required: true
    },

    rooms:{
        type: Number,
        required: true
    },



    description: {
        type: String,
        required: true
    },
    
    rules:{
        type:[String],
        enum:['Fumar', 'Mascotas', 'Fiestas', 'Invitados']
    },

    photos: {
        type: [{
            photo: {
                type: String, // URL de la foto
                required: true,
            },
            descriptionPhoto: {
                type: String,
                maxlength: 50,  // Máximo 50 caracteres
                default: ""
            }
        }],
        validate: {
            validator: function(v) {
                return v.length <= 4; // Verifica que el array tenga como máximo 4 elementos
            },
            message: 'El array de fotos debe tener como máximo 4 elementos.'
        }
    },

    maxGuest:{
        type: Number,
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
    
    },

    services:{
        type:[String],
        enum: ['Wifi', 'Aire Acondicionado', 'Calefacción', 'TV', 'Cocina', 'Servicio para Discapacitados']
        
    }, 

   })

// Asegurarse de que el índice geoespacial se cree
apartmentSchema.index({ location: '2dsphere' });


const Apartment = model("Apartment", apartmentSchema);

module.exports = Apartment;