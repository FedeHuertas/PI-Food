const { Router } = require('express');
const axios = require('axios');
require('dotenv').config();
const { Recipe, Op } = require('../db.js');
const hardCodeApi = require('../100recipes.json');
const { Diet } = require('../db.js');

const router = Router();

const apiResultsNumber = 100;
const apiKey = process.env.API_KEY_2

router.get('/', async (req, res) => {
    const search = req.query.search;
    const diets =  req.query.diets;
    //const resApi = hardCodeApi.results;
    const resApi = [];
    let resDB = [];

    await axios(`https://api.spoonacular.com/recipes/complexSearch?number=${apiResultsNumber}&addRecipeInformation=true&apiKey=${apiKey}`)
    .then(r => {
        r.data.results.map(r => resApi.push(r));
    })
    .catch(err => res.status(500).send(err))

    resDB = await Recipe.findAll({
        include: Diet,
    });

    let response = resApi.concat(resDB);

    if (response.length) {
        if(search) response = response.filter(r => r.title.toUpperCase().includes(search.toUpperCase()));
/*         if(diets) diets.forEach(diet => {
            response = response.filter(r => r.diets.includes(diet))
        }); */

        if(diets) {
            response = response.filter(r => r.diets.includes(diets))
        };
        
        res.send(response);
    } else {
        res.status(404).send([])
    }
});


router.get('/:id', async (req, res) => {
    const  { id }  = req.params;

    const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

    if (regexExp.test(id)) {
        const dbRes = await Recipe.findByPk(id, {
            include: Diet
        });

        dbRes !== null ? res.send(dbRes) : res.status(404).send('no se encontró unsa receta con ese id')
    } else if (typeof parseInt(id, 10) === "number") {
        const apiRes = await axios(`https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=${apiKey}`).catch(err => {
            res.status(500).send('La id ingresada es inválida')
            return;
        });

        if(apiRes !== undefined) {
            res.json({
                image: apiRes.data.image,
                title: apiRes.data.title,
                summary: apiRes.data.summary,
                healthScore: apiRes.data.healthScore,
                instructions: apiRes.data.instructions,
                analyzedInstructions: apiRes.data.analyzedInstructions,
                diets: apiRes.data.diets
            })  
        }

    } else {
            res.status(404).send('no se encontró unsa receta con ese id');
    };
});

router.post('/', async (req, res) => {
    const { title, summary, healthScore, steps, diets, image } = req.body;

    if (title && summary) {
        try {
            const recipe = await Recipe.create({
                title: title,
                summary: summary,
                healthScore: healthScore,
                steps: steps,
                image: image
            });
            diets.length && diets.map(d => recipe.addDiets(d.id));
            res.status(201).send(recipe);
        } catch (err) {
            console.log(err)
            res.status(500).send(err);
        };
    } else {
        res.status(400).send('Falta ingresar datos obligatorios para crear la receta.');
    };
});

module.exports = router;