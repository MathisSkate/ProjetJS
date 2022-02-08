// Importation du module mongoose de MongoDB
//Mongoose permet de créer un Shema des données enregistrer dans MongoDB
const mongoose = require('mongoose');

//Création d'un Shema de données de l'utilisateur à enregistrer dans MongoDB
const utilisateurSchema = mongoose.Schema({
    nom_utilisateur: { type: String, require: true },
    prenom_utilisateur: { type: String, require: true },
    email_utilisateur: { type: String, require: true },
    motdepasse_utilisateur: { type: String, require: true }
})

//Exportation du Schema de données
module.exports = mongoose.model('Utilisateur', utilisateurSchema);