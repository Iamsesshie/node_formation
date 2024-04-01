const express = require('express');
const mongoose = require('mongoose')
const thing = require('./models/thing')
const app = express();
app.use (express.json());


// Ces headers permettent :
// d'accéder à notre API depuis n'importe quelle origine ( '*' )
// d'ajouter les headers mentionnés aux requêtes envoyées vers notre API (Origin , X-Requested-With , etc.) ;
// d'envoyer des requêtes avec les méthodes mentionnées ( GET ,POST , etc.).


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

// la connection a la base de donnée

  mongoose.connect('mongodb+srv://msesshie:123Skm321@cluster0.2sdtciz.mongodb.net/',)
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));




// c est une route d enregistrement , il permet d exclure le id du frontend et repondre oui si l enregistrement est fait et erreur dans le cas erreur
// L'opérateur spread ... est utilisé pour faire une copie de tous les éléments de req.body 
app.post('/api/stuff', (req, res, next) => {
    delete req.body._id
    const thing = new thing({
        ...req.body
    });

    thing.save()
    .then(() =>{res.statuts(201).json({message : 'objet recu'})})
    .catch(error => {res.status(400).json({message :'erreur'})})
})


// route qui a permit au recueillement de des objets si dessous sur la pade du frontend


app.use('/api/stuff',(req, res, next) =>{
   thing.find()
   .then(things => res.status(200).json(things))
   .catch(err => res.status(400).json({erreur}))
   
})



// c est une route qui renvoit un message 201 qui veut dire un objet a ete cree suite a l enregistrement 

app.post('/api/stuff',(req, res, next) =>{
    console.log(req.body);
    res.status(201).json({message : 'objet cree'})
})











module.exports = app;