const express = require('express');
const router = express.Router();

const mysqlConnection = require('../config/bd-conf');


//Visualizar estudiante
router.get("/rutina", (req, res) => {
    mysqlConnection.query('Select * from rutina', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send(err);
        }
    });
});

//Ver estudiante Individual
router.get("/rutina/:id", (req, res) => {
    mysqlConnection.query('Select * from rutina where id = ?', [req.params.id], (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});

//Crear Persona
router.post("/rutina", (req, res) => {
    let per = req.body;
    mysqlConnection.query('insert into rutina (id_persona, id_entrenador, tipo) values (?,?,?)',
        [per.id_persona,per.id_entrenador,per.tipo], (err, result) => {
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
router.put("/rutina/:id", (req, res) => {
    let per = req.body;
    mysqlConnection.query('update rutina set id_persona = ?, id_entrenador = ?, tipo = ?, where id = ?',
        [per.id_persona, per.id_entrenador,  per.tipo, req.params.id], (err, result) => {
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
router.delete("/rutina/:id", (req, res) => {
    mysqlConnection.query('delete from rutina where id = ?',
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