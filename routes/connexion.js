var express = require('express');
var router = express.Router();
let lister = require('../controllers/connexion')

/* GET home page. */
router.get('/', lister.getConnexion);

router.post('/', enregistrer.submitConnexionUser);

module.exports = router;