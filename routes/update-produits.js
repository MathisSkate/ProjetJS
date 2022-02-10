//Importation des modules à utiliser
var express = require('express');
var router = express.Router();

//Importation du controlleur update-produits
let update = require('../controllers/update-produits')
const Produits = require("../models/Produits");

router.get('/delete/:id', update.deleteProduit);

router.get('/update/:id', update.getUpdate);

router.post('/updated/:id', update.updateProduit);

module.exports = router;