// Importation du module mongoose de MongoDB
//Mongoose permet de créer un Shema des données enregistrer dans MongoDB
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//Création d'un Shema de données de l'utilisateur à enregistrer dans MongoDB
const utilisateurSchema = mongoose.Schema({
    nom_utilisateur: { type: String, require: true },
    prenom_utilisateur: { type: String, require: true },
    email_utilisateur: { type: String, require: true },
    motdepasse_utilisateur: { type: String, require: true }
})

utilisateurSchema.pre('save', async function (next) {
  if (!this.isModified('motdepasse_utilisateur')) next()

  this.motdepasse_utilisateur = await bcrypt.hash(this.motdepasse_utilisateur, 10)
  next()
})


//Exportation du Schema de données
module.exports = mongoose.model('Utilisateur', utilisateurSchema);
