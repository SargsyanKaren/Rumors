const { MongoClient } = require('mongodb');
const { url, dbName, collectionName } = require('../mongo.js');
const bcrypt = require('bcrypt');
const _omit = require('lodash/omit');


const login = (req, res) => {
    const client = new MongoClient(url, { useNewUrlParser: true });
    client.connect((err, client) => {
        const db = client.db( dbName );
        const collection = db.collection( collectionName );
        collection.findOne({email: req.body.email},  (err, result) => {
            if(err){
                res.status(404);
                res.end();
                return;
            }
            if(result){
                let isSignedUp = bcrypt.compareSync(req.body.password, result.password);
                if(!isSignedUp){
                    res.status(401);
                    res.end();
                    return;
                } 
                res.json({ data: _omit(result, ["password"]) });
                res.end();
                return
            } 
            res.status(404);
            res.end();
            return;
            
            
        })
        client.close();
    })
}

module.exports = login;