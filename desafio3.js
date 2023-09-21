//declara express y puerto
const express = require("express");
const app = express();
const port = 3000;

const telefonos = require("./agenda");

//EJERCICIO 5
//editar 
app.use("/api/agendaedit/:id", (req, res) => {
    const id = req.params.id;
    let telefono = telefonos.find((x)=> x.id != id);
    telefono.name = req.body.name;
    telefono.number = req.body.number;
    res.status(200).json({estado: "OK", result: telefono});
});

//EJERCICIO 4
//eliminar registro x id
app.use("/api/agendadeletexid/:id", (req, res) => {
    const id = req.params.id;
    const telefono = telefonos.filter ((x)=> x.id != id);
    res.status(200).json({estado: "OK", result: telefono});
});
//eliminar registro x number
app.use("/api/agendadeletexnumber/:number", (req, res) => {
    const number = req.params.number;
    const telefono = telefonos.filter ((x)=> x.number != number);
    res.status(200).json({estado: "OK", result: telefono});
});
//EJERCICIO 3
//agregar registro
app.use("/api/agendaadd", (req, res) => {
    const registro = {
        name: req.body.name,
        number: req.body.number,
        id: telefonos.length + 1,
    }
    telefonos.push(registro);
    
    res.status(200).json({estado: "OK", result: telefonos});
});
//EJERCICIO 2
//cantidad de telefonos ej: http://buscaxid ej: http://localhost:3000/api/agendacant
app.use("/api/agendacant", (req, res) => {
    const cant = telefonos.length;
    res.status(200).json({estado: "OK", result: cant});
});


//agenda completa ej: http://buscaxid ej: http://localhost:3000/api/agendalist
app.use("/api/agendalist", (req, res) => {
    res.status(200).json({estado: "OK", result: telefonos});
});

//buscaxid ej: http://localhost:3000/api/agendaxtel/1
app.use("/api/agendaxtel/:number", (req, res) => {
    const number = req.params.number;
    const telefono = telefonos.find ((x)=> x.number == number);
    console.log("---",telefono);
    if (telefono){
        res.status(200).json({estado: "OK", result: telefono});
    }else{
        res.status(400).json({estado: "Registro No Encontrado"});
    }
});

//buscaxid ej: http://localhost:3000/api/agenda/1
app.use("/api/agenda/:id", (req, res) => {
    const id = req.params.id;
    const telefono = telefonos.find ((x)=> x.id == id);
    res.status(200).json({estado: "OK", result: telefono});
});



//informa estado de server
app.listen(port, () => {
    console.log("la aplicacion esta corriendo correstamente");
});


