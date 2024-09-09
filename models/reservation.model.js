const { Schema, model } = require('mongoose');

const reservationSchema = Schema({
    email: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true,
        validate: {
          validator: function (value) {
            // Compara que endDate sea al menos un día después de startDate
            return value > this.startDate.setDate(this.startDate.getDate() + 1);
          },
          message: 'The end date must be at least one day after the start date.'
        }
      },
    status: {
        type: String,
        enum: ['Pending', 'Accepted', 'Rejected'],
        default: 'Pending'
    },
    apartment: { type: Schema.Types.ObjectId, ref: 'Apartment' }
});

const Reservation = model('Reservation', reservationSchema);
module.exports = Reservation;