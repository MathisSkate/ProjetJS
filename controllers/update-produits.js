//Importation du Schema Produit depuis notre modèle
const Produits = require('../models/Produits');
const mongo = require('mongodb');

exports.deleteProduit = function(req, res, next) {
    //Création d'une instance de l'id de l'objet
    var o_id = new mongo.ObjectID(req.params.id);
    if(req.session.email == null)
        res.status(400).json({ error: 'vous devez être connecter' })
    Produits.collection.findOneAndDelete({"_id": o_id, "email_utilisateur": req.session.email})
        .then(() => res.status(201).json({
            message: 'Produit supprimé avec succès ! '
        }))
        .catch(error => res.status(400).json({ error: error.message }));
}