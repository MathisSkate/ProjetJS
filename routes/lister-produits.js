var express = require('express');
var router = express.Router();
let lister = require('../controllers/lister-produits')
const Produits = require('../models/Produits');

/* GET home page. */
//router.get('/', lister.getLister);
router.get('/', async (req, res) => {
    var noMatch = null;
    if (req.query.search) {
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        const prods = await Produits.collection.find({nom_produit: regex}).toArray();
        if (prods.length < 1) {
            noMatch = "Veuillez réessayer! ce produit n'exite pas.";
        }
        
        res.render("lister-produits", {prods, noMatch: noMatch});
    }
    else {
        const prods = await Produits.collection.find().toArray();
        res.render("lister-produits", {prods, noMatch: noMatch});
        
    }
});

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports = router;
