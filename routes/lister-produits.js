var express = require('express');
var router = express.Router();
let lister = require('../controllers/lister-produits')
const Produits = require('../models/Produits');

/* GET home page. */
//router.get('/', lister.getLister);
router.get('/', async (req, res) => {
    const prods = await Produits.collection.find().toArray();
    res.render("lister-produits", {prods});
});

router.get('/deleteProduit/{nom}', lister.removeProduit);

module.exports = router;