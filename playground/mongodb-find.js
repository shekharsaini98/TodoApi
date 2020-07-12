const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if(err){
        return console.log('Unable to connect with mongodb');
    }
    console.log('Connected to mongodb server');
    const db = client.db('TodoApp'); 
    db.collection('Todos').find().toArray().then((docs) => {
        console.log('All users');
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        if(err){
            console.log('Unable to fetch', err);
        }
    });
    // To count
    db.collection('Todos').find().count().then((count) => {
        console.log('All users count');
        console.log(count);
    }, (err) => {
        if(err){
            console.log('Unable to fetch', err);
        }
    });

    client.close();
});