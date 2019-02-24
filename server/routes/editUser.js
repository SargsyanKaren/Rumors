const { MongoClient, ObjectID } = require('mongodb');
const { url, dbName, collectionName } = require('../mongo.js');

const editUser = (req, res) => {
    const id = req.params.id;
    const token = req.headers.authorization;
    const userData = req.body.data;
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
                collection.replaceOne({"_id": new ObjectID(id)}, {$set: {
                    name: userData.name,
                    birthday: userData.birthday,
                    gender: userData.gender,
                    tell: userData.tell,
                    address: userData.address
                }}, (err, result) => {
                    if(err){
                        res.status(404);
                        return;
                    }
                })
                client.close()
            })

        })
        
        client.close();
    })
    res.end()
};

module.exports = editUser;