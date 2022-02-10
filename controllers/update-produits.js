//Importation du Schema Produit depuis notre modèle
const Produits = require('../models/Produits');
const mongo = require('mongodb');

//Création d'une fonction pour appeler la page enregistrer-produit
exports.getEnregistrer = function(req, res, next) {
    //Rendu de la page enregistrer-produits via la méthode res.render
    if(req.session.email == null)
        res.status(400).json({error: 'vous devez être connecter'});
    res.render('enregistrer-produits');
}

//Création d'une 
exports.submitProductdataToDB = function(req, res, next) {
    //Création d'une instance de l'objet Produit
    const produit = new Produits({
        //Récupération des valeur des champ du formulaire d'enregistrement
        //avec req.body
        nom_produit: req.body.nom_produit,
        prix_produit: req.body.prix_produit,
        descript_produit: req.body.descript_produit,
        //Construction du nom de l'image à enregistrer, en utilisant une chaine complexe 
        url_image: `${req.protocol}://${req.get('host')}/images/images_produits/${req.file.filename}`,
        email_utilisateur : req.session.email
    });
    //Enregistrement du produit
    produit.save()
        .then(() => res.status(201).json({
            message: 'Produit enregistré avec succès ! '
        }))
        .catch(error => res.status(400).json({ error: error.message }));


}

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