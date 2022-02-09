var express = require('express');
var router = express.Router();
let inscription = require('../controllers/inscription');

/* GET home page. */
router.get('/', inscription.getInscription);

router.post('/', inscription.submitInscriptionUser);

module.exports = router;