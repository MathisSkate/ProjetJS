//const Utilisateurs = require('../models/Utilisateurs');

exports.getConnexion = function(req, res, next) {
    res.render('connexion');
}

exports.submitConnexionUser = function(req, res, next) {
    //Création d'une instance de l'objet Produit
    const user = new Produits({
        //Récupération des valeur des champ du formulaire d'enregistrement
        //avec req.body
        nom_produit: req.body.nom_produit,
        prix_produit: req.body.prix_produit,
        descript_produit: req.body.descript_produit,
        //Construction du nom de l'image à enregistrer, en utilisant une chaine complexe 
        url_image: `${req.protocol}://${req.get('host')}/public/images/images_produits/${req.file.filename}`
    });
    //Enregistrement du produit
    produit.save()
        .then(() => res.status(201).json({
            message: 'Produit enregistré avec succès ! '
        }))    
        .catch(error => res.status(400).json({ error: error.message }));


}