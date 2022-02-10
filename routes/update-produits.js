//Importation des modules à utiliser
var express = require('express');
var router = express.Router();

//Importation du controlleur enregistrer-produit
let update = require('../controllers/update-produits')

router.get('/delete/:id', update.deleteProduit);

module.exports = router;