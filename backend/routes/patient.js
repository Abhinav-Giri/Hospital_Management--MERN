const express = require('express');
const router = express.Router();

 const Patient = require('../models/patient')

 //get all patients

 router.route('/').get((req,res)=>{

    Patient.find().then(patients=> res.json(patients)).catch((error)=> res.status(400).json("Error " + error))
 })

 //add new patient record

 router.route('/add').post((req,res)=>{
    
    const {name, age,gender} = req.body;
    const newPatient = new Patient({name,age,gender})
    newPatient.save().then(patient => {
res.status(201).json(patient)}).catch((error)=> res.status(400).json('Error: ' +error))
    
    })

 

 //Update patient record
 router.route('/update/:id').post((req,res)=>{
    
    Patient.findById(req.params.id).then(patient => {
        if(!patient){
res.status(404).json('Patient not found!')
        }
patient.name = req.body.name;
patient.age = req.body. age;
patient.gender = req.body.gender;
patient.save().then(()=> res.json('Patient Updated!'))
.catch((error)=> res.status(400).json("Error "+ error))
    })

 })

 //delete patient record
 router.route('/delete/:id').delete((req,res)=>{
        Patient.findByIdAndDelete(req.params.id).then((patient)=> {
           if(!patient){
               return res.status(404).json('Patient record not found')
           }
           res.json('Record Deleted Successfully!')
        })
        .catch((error)=>{res.status(400).json('Error' + error)})
       });

       module.exports =router;