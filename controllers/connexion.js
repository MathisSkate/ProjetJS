const Utilisateurs = require('../models/Utilisateurs');

exports.getConnexion = (req, res, next) => {
    res.render('connexion');
};

exports.submitConnexionUser = async (req, res, next) => {
    console.log("--------------------");
    console.log(req.body.mailConnexion);
    console.log(req.body.mdpConnexion);
    console.log("--------------------");
    const user = await Utilisateurs.collection.find({"email_utilisateur": req.body.mailConnexion, "motdepasse_utilisateur": req.body.mdpConnexion}).toArray();
    console.log(user);
    if(user){
        req.session.nom = user[0].nom_utilisateur;
        req.session.prenom = user[0].prenom_utilisateur;
        req.session.email = user[0].email_utilisateur;
        console.log(req.session);
        res.redirect("/");
    }else{
        res.redirect("/connexion");
    }
    //Enregistrement du produit
    
}