const express = require('express');
const router = express.Router();

const Doctor = require('../models/doctor');

//Get all doctors

router.route('/').get((req,res)=>{
    Doctor.find().then(doctors=> res.json(doctors))
    .catch(error=>res.status(400).json('Error:' + error))
});
// add new doctor:
router.route('/add').post((req,res)=>{
    const {name,speciality,department} = req.body;
    const newDoctor = new Doctor({name, speciality,department})
    newDoctor.save().then(savedDoctor=> res.status(201).json(savedDoctor)).catch((error)=>res.status(400).json('Error:', error));

})
//update doctor data

router.route('/update/:id').post((req,res)=>{
    Doctor.findById(req.params.id).then((doctor)=> {
        if(!doctor){ 
            return res.status(404).json('Doctor Not Found');
        }
        doctor.name = req.body.name;
        doctor.speciality =req.body.speciality
        doctor.department = req.body.department
        doctor.save().then(()=>res.json('Doctor record updated!')).catch((error)=>res.status(400).json('Error',+error))

    })
    .catch((error)=> res.status(400).json('Error' +error))
});

//Delete record of Doctor by Id

router.route('/delete/:id').delete((req,res)=>{
 Doctor.findByIdAndDelete(req.params.id).then((doctor)=> {
    if(!doctor){
        return res.status(404).json('Doctor not found')
    }
    res.json('Record Deleted Successfully!')
 })
 .catch((error)=>{res.status(400).json('Error' + error)})
});

module.exports =router;