const express = require('express');
const router = express.Router();

const mysqlConnection = require('../config/bd-conf');


//Visualizar estudiante
router.get("/ejercicio", (req, res) => {
    mysqlConnection.query('Select * from ejercicio', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send(err);
        }
    });
});

//Ver estudiante Individual
router.get("/ejercicio/:id", (req, res) => {
    mysqlConnection.query('Select * from ejercicio where id = ?', [req.params.id], (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});

//Crear Persona
router.post("/ejercicio", (req, res) => {
    let per = req.body;
    mysqlConnection.query('insert into ejercicio (id_rutina, id_entrenador,nombre, parte_ejercitada, duracion) values (?,?,?,?,?)',
        [per.nombre, per.id_rutina, per.id_entrenador, per.nombre, per.parte_ejercitada, per.duracion], (err, result) => {
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
router.put("/ejercicio/:id", (req, res) => {
    let per = req.body;
    mysqlConnection.query('update ejercicio set id_rutina = ?, id_entrenador = ?, nombre = ?, parte_ejercitada=?, duracion = ?,  where id = ?',
        [per.nombre, per.apellido,  per.peso_inicial, per.peso_meta, per.tallas_iniciales, per.tallas_metas, req.params.id], (err, result) => {
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
router.delete("/ejercicio/:id", (req, res) => {
    mysqlConnection.query('delete from ejercicio where id = ?',
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