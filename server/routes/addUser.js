const { MongoClient, ObjectID } = require('mongodb');
const { url, dbName, collectionName } = require('../mongo.js');

const addUser = (req, res) => {
    const client = new MongoClient(url, { useNewUrlParser: true });
    const token = req.headers.authorization;
    const newUser = req.body.data
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
                collection.insertOne({
                    ...newUser,
                    email: "newUser@gmail.com",
                    password: "$2a$12$7iMIxBHn9yPqcMlosl04GuzOK83bosmIEAGU5Q6ZnzVjQSigD.vWi"
                }, (err, result) => {
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

module.exports = addUser;