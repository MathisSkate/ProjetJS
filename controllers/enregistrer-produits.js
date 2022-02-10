//Importation du Schema Produit depuis notre modèle
const Produits = require('../models/Produits');
const mongo = require('mongodb');

//Création d'une fonction pour appeler la page enregistrer-produit
exports.getEnregistrer = function(req, res, next) {
    //Rendu de la page enregistrer-produits via la méthode res.render
    if(req.session.email == null){
        res.redirect("/");
    }
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
        .then()
        .catch(res.redirect("/lister-produits"));

    res.redirect("/lister-produits");
}