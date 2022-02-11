//Importation du Schema Produit depuis notre modèle
const Produits = require('../models/Produits');
const mongo = require('mongodb');

exports.getUpdate= (req, res, next) => {
    res.render('update-produits', {page: req.url});
};

exports.deleteProduit = function (req, res, next) {
    //Création d'une instance de l'id de l'objet
    var o_id = new mongo.ObjectID(req.params.id);
    if (req.session.email == null)
        res.redirect('/')
    Produits.collection.findOneAndDelete({"_id": o_id, "email_utilisateur": req.session.email})
        .then()
        .catch(error => res.status(400).json({ error: error.message }));


    res.redirect('/lister-produits');
}

exports.updateProduit = async function (req, res, next) {
    var nom = req.body.nomProd;
    var desc = req.body.descProd;
    var prix = req.body.prixProd;
    var o_id = new mongo.ObjectID(req.params.id);
    const filter = { "_id": o_id, "email_utilisateur": req.session.email };
    const update = { $set: { "nom_produit": nom, "descript_produit": desc, "prix_produit": prix }};
    await Produits.collection.findOneAndUpdate(filter, update);
    res.redirect('/lister-produits');
}
