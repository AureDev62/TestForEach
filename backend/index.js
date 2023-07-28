const express = require('express');
const app = express();
const PORT = 5000;
const fs = require('fs');

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});


//on charge les données des excuses existantes dans le fichier json
let excusesData = require('./excuses.json');
console.log(excusesData);


//route pour récupèrer toutes les excuses
app.get('/excuses', (req, res) => {
    return res.json(excusesData);
});

//route pour ajouter des excuses
app.post('/excuses', (req, res) => {
    let newExcuse = req.body;
    if (newExcuse.tag && newExcuse.message) {

        const httpCode = 800 + excusesData.length;
        //création d'un nouvel objet 
        newExcuse = {
            http_code: httpCode,
            tag: newExcuse.tag,
            message: newExcuse.message
        };

        //on ajoute les nouvelles excuses
        excusesData.push(newExcuse);
        //écriture de la liste mise a jour "excusesData" dans le fichier json
        fs.writeFile('./excuses.json', JSON.stringify(excusesData, null, 2), (err) => {
            if (err) {
                console.error('Impossible de sauvegarder de nouvelles excuses. :', err);
                return res.status(500).json({ message: 'Impossible de sauvegarder de nouvelles excuses.' });
            }
            return res.status(201).json({ message: 'Excuse sauvegardée avec succès !', excuse: newExcuse });
        });
    } else {
        return res.status(400).json({ message: 'Excuse non valide !' });
    }
});

app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});