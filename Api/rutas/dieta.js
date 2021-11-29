const express = require('express');
const router = express.Router();

const mysqlConnection = require('../config/bd-conf');


//Visualizar estudiante
router.get("/dieta", (req, res) => {
    mysqlConnection.query('Select * from dieta', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send(err);
        }
    });
});

//Ver estudiante Individual
router.get("/dieta/:id", (req, res) => {
    mysqlConnection.query('Select * from dieta where id = ?', [req.params.id], (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});

//Crear Persona
router.post("/dieta", (req, res) => {
    let per = req.body;
    mysqlConnection.query('insert into dieta (id_persona, nombre,fecha_inicio,fecha_fin,completada) values (?,?,?,?,?)',
        [per.nombre, per.id_persona, per.nombre, per.fecha_inicio, per.fecha_fin,per.completada], (err, result) => {
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
router.put("/dieta/:id", (req, res) => {
    let per = req.body;
    mysqlConnection.query('update dieta  set id_persona = ?, nombre = ?, fecha_inicio = ?, fecha_fin=?, completada = ?,  where id = ?',
        [per.nombre, per.id_persona,  per.nombre, per.fecha_inicio, per.fecha_fin, per.completada, req.params.id], (err, result) => {
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
router.delete("/dieta/:id", (req, res) => {
    mysqlConnection.query('delete from dieta where id = ?',
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