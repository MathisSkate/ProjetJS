//Importation des modules à utiliser
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');
require('dotenv').config();

//Définition des routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var enregistrerRouter = require('./routes/enregistrer-produits');
var listerRouter = require('./routes/lister-produits');
var getConnexion = require('./routes/connexion');
var logOut = require('./routes/log-out');
var inscription = require('./routes/inscription');
var updateProduits = require('./routes/update-produits');

var app = express();

//Connexion à la base de données via mongoose
//La chaine de connexion à la BD est définie dans un fichier .env
mongoose.connect(process.env.CONNEXION_DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));


// Définition du répertoire pour le 'view' de l'App
app.set('views', path.join(__dirname, 'views/pages'));
//Définition de EJS comme moteur de template
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));
//Définition du dossier 'public' comme espace de stockage pour les fichier statiques
app.use(express.static(path.join(__dirname, 'public')));

// session handler
app.use(function(req, res, next){
    res.locals.session = req.session;
    next();
});

//Utilisation de chaque route pour une page spécifique 
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/enregistrer-produits', enregistrerRouter);
app.use('/lister-produits', listerRouter);
app.use('/connexion', getConnexion);
app.use('/log-out', logOut);
app.use('/inscription', inscription);
app.use('/update-produits', updateProduits);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;