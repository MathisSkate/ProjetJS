//Importation du Schema Produit depuis notre modèle
const Produits = require('../models/Produits');
const mongo = require('mongodb');

exports.getUpdate= (req, res, next) => {
    res.render('update-produits');
};

exports.deleteProduit = function (req, res, next) {
    //Création d'une instance de l'id de l'objet
    var o_id = new mongo.ObjectID(req.params.id);
    if (req.session.email == null)
        res.redirect('/')
    Produits.collection.findOneAndDelete({"_id": o_id, "email_utilisateur": req.session.email})
        .then()
        .catch(error => res.status(400).json({error: error.message}));
    res.redirect('/lister-produits');
}

exports.updateProduit = async function (req, res, next) {
    var nom = req.body.nom_produit;
    var prix = req.body.prix_produit;
    console.log("--------------------");
    console.log(nom);
    console.log(prix);
    console.log("--------------------");
    var o_id = new mongo.ObjectID(req.params.id);
    const prods = await Produits.collection.findOneAndUpdate({
        "_id": o_id,
        "email_utilisateur": req.session.email
    }, {"nom_produit": nom, "prix_produit": prix}).toArray();
    console.log(prods);
}