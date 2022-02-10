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