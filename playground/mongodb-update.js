const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost/27017/TodoApp', (err, client) => {
    if(err){
        return console.log('Unable to connect');
    }
    console.log('Connect to Mongodb server');
    const db = client.db('TodoApp');

    // db.collection('Todos')
    // .findOneAndUpdate(
    //     {
    //         _id: new ObjectID('5eefc7fe7b46a41ad5eebbb5')
    //     },
    //     {
    //         $set: {
    //             completed: false
    //         }
    //     },
    //     {
    //         returnOriginal: false
    //     }
    // )
    // .then((result) => {
    //     console.log(result);
    // });

    db.collection('Users')
    .findOneAndUpdate(
        {
            _id: new ObjectID('5eee7d8d25caae0968ebc426')
        },
        {
            $set: {
                Name: 'Simmi Saini'
            },
            $inc: {
                Age: 1
            }
        },
        {
            returnOriginal: false
        }
    )
    .then((result) => {
        console.log(result);
    });
    
    client.close();
});