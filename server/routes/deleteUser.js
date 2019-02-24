const { MongoClient, ObjectID } = require('mongodb');
const { url, dbName, collectionName } = require('../mongo.js');

const deleteUser = (req, res) => {
    const client = new MongoClient(url, { useNewUrlParser: true });
    const id = req.params.id;
    const token = req.headers.authorization;
    client.connect((err, client) => {
        const db = client.db( dbName );
        const collection = db.collection( collectionName );
        collection.findOne({_id: new ObjectID(token)}, (err, result) => {
            if(err){
                res.status(404);
                res.end();
                return;
            }
            const client = new MongoClient(url, { useNewUrlParser: true });
            client.connect((err, client) => {
                const db = client.db( dbName );
                const collection = db.collection( collectionName );
                collection.deleteOne({_id: new ObjectID(id)}, (err, result) => {
                    if(err){
                        res.status(404);
                    }
                    res.end();
                });
            });   
        });
        client.close();
    });
};

module.exports = deleteUser;