const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema(
    {
        patientName: {
            type: String,
            required:true,
            minlength:3
        },
        doctorName: {
            type: String,
            required:true,
            
        },
        date: {
            type: Date,
            required:true
        }

    }
)
const Appointment = mongoose.model('Appointment', appointmentSchema)
module.exports = Appointment;