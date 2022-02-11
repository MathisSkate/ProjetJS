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
  try {
    /* 
    Here first checking if the document is new by using a helper of mongoose .isNew, therefore, this.isNew is true if document is new else false, and we only want to hash the password if its a new document, else  it will again hash the password if you save the document again by making some changes in other fields incase your document contains other fields.
    */
    if (this.isNew) {
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(this.motdepasse_utilisateur, salt)
      this.motdepasse_utilisateur = hashedPassword
    }
    next();
  } catch (error) {
    next(error)
  }
})

utilisateurSchema.methods.isValidPassword = async function (motdepasse_utilisateur, hashedPassword) {
  try {
    return await bcrypt.compare(motdepasse_utilisateur, hashedPassword)
  } catch (error) {
    throw error
  }
}


//Exportation du Schema de données
module.exports = mongoose.model('Utilisateur', utilisateurSchema);
