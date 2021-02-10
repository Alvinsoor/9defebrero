const express = require('express');
const Joi = require('joi');
const router = express.Router();

const data = require('../species');

const schema = Joi.object({
    name: Joi.string().min(3).required(),
    age: Joi.number().greater(0)
});

router.get('/', (req, res) => {
    const {orderBy} = req.query;

    res.send({data, orderBy});
});

router.get('/:id', (req, res) => {
    const {id} = req.params;

    res.send(data.get(id));
});

router.post('/', (req, res) => {
    const {name, age} = req.body;

    const result = schema.validate({name, age});
    if (result.error) return res.status(400).send(result.error.details[0].message);

    const perro = data.create(name, age);

    res.send(perro);
});

router.put('/:id', (req, res, next) => {
    const {id} = req.params;
    const {name = '', age = ''} = req.body;

    const {perro, err} = data.update(id, age, name);
    if (err) return next();

    res.send(perro);
});

router.delete('/:id', (req, res) => {
    const {id} = req.params;

    const perro = data.delete(id);

    res.send(perro);
});

module.exports = router;