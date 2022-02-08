var express = require('express');
var router = express.Router();
let connexion = require('../controllers/connexion');

/* GET home page. */
router.get('/', connexion.getConnexion);

router.post('/', connexion.submitConnexionUser);

module.exports = router;