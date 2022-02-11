const Utilisateurs = require('../models/Utilisateurs');
const bcrypt = require("bcrypt");

exports.getConnexion = (req, res, next) => {
    res.render('connexion');
};

exports.submitConnexionUser = async (req, res, next) => {
    const user = await Utilisateurs.collection.find({"email_utilisateur": req.body.mailConnexion}).toArray();
    if(user.length != 0){
        if(Utilisateurs.schema.methods.isValidPassword(req.body.mdpConnexion, user[0].motdepasse_utilisateur)) {
            req.session.nom = user[0].nom_utilisateur;
            req.session.prenom = user[0].prenom_utilisateur;
            req.session.email = user[0].email_utilisateur;
            res.redirect("/");
        }
    }else{
        res.redirect("/connexion");
    }
    //Enregistrement du produit
    
}
