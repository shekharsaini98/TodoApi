const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if(err){
        return console.log('Unable to connect with mongodb');
    }
    console.log('Connected to mongodb server');
    const db = client.db('TodoApp'); 

    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     completed: false
    // }, (err, result) => {
    //     if(err){
    //         return console.log('Unable to insert');
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });

    db.collection('Users').insertOne({
        Name: 'Jerry Saini',
        Age: 22,
        Location: 'unknow'
    }, (err, result) => {
        if(err){
            return console.log('Unable to insert');
        }
        console.log(JSON.stringify(result.ops, undefined, 2));
    });

    client.close();
});