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
            nom_utilisateur: req.body.nomInscription,
            prenom_utilisateur: req.body.prenomInscription,
            email_utilisateur: req.body.mailInscription,
            motdepasse_utilisateur: req.body.mdpInscription
        });
        //Enregistrement de l'utilisateur
        user.save()
            .then()
            .catch(res.redirect("/inscription"));

        req.session.nom = user.nom_utilisateur;
        req.session.prenom = user.prenom_utilisateur;
        res.redirect("/");
    }
    
}