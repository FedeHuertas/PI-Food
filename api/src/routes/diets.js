const { Router } = require('express');
const { Diet } = require('../db.js');
const bulkDiets = require('../data-diets.json');

const router = Router();

router.get('/', async (req, res) => {
    const diets = await Diet.findAll();
    !diets.length ? Diet.bulkCreate(bulkDiets) : null;
    res.send(await Diet.findAll());
});

module.exports = router;