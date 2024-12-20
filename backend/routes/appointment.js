const express = require('express')
const router = express.Router();
const Appointment = require('../models/appointment')

//get all appointments
router.route('/').get((req,res)=>{
    Appointment.find().then(appointments=> {
        res.status(200).json(appointments)
    }).catch((error)=>{res.status(400).json('No Booking Found!')})
})

//add a record
router.route('/add').post((req,res)=> {
    const {patientName, doctorName, date} = req.body;
    const newAppointments = new Appointment({patientName, doctorName, date})

    newAppointments.save().then(appointment=> res.status(201).json(appointment)).catch((error)=>{
        res.status(400).json('Appointment not made')
    })
})

//update a record
router.route('/update/:id').post((req,res)=> {
    Appointment.findByIdAndUpdate(req.params.id).then(appointment=> {
        if(!appointment){
            res.status(404).json('Invalid Id')
        }
        appointment.patientName = req.body.patientName;
        appointment.doctorName = req.body.doctorName;
        appointment.Date = req.body.Date;

        appointment.save().then(appointment=> res.status(201).json('Appointment updated')).catch((error)=> res.status(400).json('Updation Failed'))
    })
})

//Delete an appointment
router.route('/delete/:id').delete((req,res)=> {
    Appointment.findByIdAndDelete(req.params.id).then(appointment=> {
        if(!appointment){
            res.status(404).json('Invalid Id')
        }
 res.json('Appointment Deleted Succesfully')
    }).catch((error)=> res.status(400).json('An Appointment deleted successfully!'))
})


module.exports = router;