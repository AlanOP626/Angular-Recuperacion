const express = require('express');
const router = express.Router();

const mysqlConnection = require('../config/bd-conf');


//Visualizar estudiante
router.get("/entrenador", (req, res) => {
    mysqlConnection.query('Select * from entrenador', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send(err);
        }
    });
});

//Ver estudiante Individual
router.get("/entrenador/:id", (req, res) => {
    mysqlConnection.query('Select * from entrenador where id = ?', [req.params.id], (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});

//Crear Persona
router.post("/entrenador", (req, res) => {
    let per = req.body;
    mysqlConnection.query('insert into entrenador (id_persona, nombre, apellido,) values (?,?,?)',
        [per.id_persona, per.nombre, per.apellido], (err, result) => {
            if (!err) {
                console.log(result);
                res.status(201).send("Creado Correctamente");
            } else {
                console.log(err);
                res.send('Error' + err);
            }
        });
});

//Actualizar Persona
router.put("/entrenador/:id", (req, res) => {
    let per = req.body;
    mysqlConnection.query('update entrenador set id_persona= ?, nombre = ?, apellido = ?, where id = ?',
        [per.id_persona, per.nombre, per.apellido, req.params.id], (err, result) => {
            if (!err) {
                console.log(result);
                
                res.status(202).send("Actualizado Correctamente");
            } else {
                console.log(err);
                res.send('error' + err);
            }
        });
});

//Eliminar Persona
router.delete("/entrenador/:id", (req, res) => {
    mysqlConnection.query('delete from entrenador where id = ?',
        [ req.params.id], (err, result) => {
            if (!err) {
                console.log(result);
                res.status(202).send("Eliminado Correctamente");
            } else {
                console.log(err);
                res.send('error' + err);
            }
        });
});

module.exports = router;