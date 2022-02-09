const Utilisateurs = require('../models/Utilisateurs');

exports.getInscription = (req, res, next) => {
    res.render('inscription');
};

exports.submitInscriptionUser = async (req, res, next) => {
    
    var user = await Utilisateurs.collection.find({"email_utilisateur": req.body.mailInscription}).toArray();

    if(user[0]){
        res.redirect("/inscription");
    }else{
        user = new Utilisateurs({
            //Récupération des valeur des champ du formulaire d'enregistrement
            //avec req.body
            nom_utilisateur: req.body.nomInscription,
            prenom_utilisateur: req.body.prenomInscription,
            email_utilisateur: req.body.mailInscription,
            motdepasse_utilisateur: req.body.mdpInscription
        });
        //Enregistrement du produit
        user.save()
            .then()
            .catch(error => res.status(400).json({ error: error.message }));

        req.session.nom = user.nom_utilisateur;
        req.session.prenom = user.prenom_utilisateur;
        console.log(req.session);
        res.redirect("/");
    }
    
}


//Création d'une fonction pour appeler la page enregistrer-produit
exports.getEnregistrer = function(req, res, next) {
    //Rendu de la page enregistrer-produits via la méthode res.render
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
        url_image: `${req.protocol}://${req.get('host')}/public/images/images_produits/${req.file.filename}`
    });
    //Enregistrement du produit
    produit.save()
        .then(() => res.status(201).json({
            message: 'Produit enregistré avec succès ! '
        }))
        .catch(error => res.status(400).json({ error: error.message }));


}