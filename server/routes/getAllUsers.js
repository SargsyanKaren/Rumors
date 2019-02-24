const { MongoClient, ObjectID } = require('mongodb');
const { url, dbName, collectionName } = require('../mongo.js');

const getAllUsers = (req, res) => {
    var token = req.headers.authorization;
    const client = new MongoClient(url, { useNewUrlParser: true });
    client.connect((err, client) => {
        const db = client.db( dbName );
        const collection = db.collection( collectionName );
        collection.findOne({_id: new ObjectID(token)}, (err, result) => {
            if(err){
                res.status(404);
                return;
            }
            const client = new MongoClient(url, { useNewUrlParser: true });
            client.connect((err, client) => {
                const db = client.db( dbName );
                const collection = db.collection( collectionName );
        
                collection.find({}).toArray((err, data) => {
                    if(err){
                        res.status(404)
                        return;
                    }
                    res.json(data);
                    res.end();
                });
                client.close();
            });
        })
    })






}

module.exports = getAllUsers;