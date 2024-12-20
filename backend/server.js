const express = require('express');
const cors  = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const patientsRouter = require('./routes/patient');
const doctorsRouter = require('./routes/doctor');
const appointmentsRouter = require('./routes/appointment')

const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

const url ='mongodb+srv://abhinav:giri@cluster0.oedt9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(url);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
});

app.use('/patients', patientsRouter);
app.use('/doctors', doctorsRouter);
app.use('/appointments', appointmentsRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});