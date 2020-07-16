const {ObjectID} = require('mongodb');

const {moongoose} = require('../server/db/mongoose');
const {Todo} = require('../server/models/todo');


//  const id = "5f00f49a5a1ef90530d50569";
// // Is valid
// if(!ObjectID.isValid(id)){
//     console.log('Invalid Id');
// }

// Remove multiple (Todo.remove)
Todo.remove({}).then((result) => {
    console.log(result);
})

// Remove First One
Todo.findOneAndRemove({_id: '7894561'}).then((todo) => {
    console.log(todo);
})

// Remove One by ID
Todo.findByIdAndRemove('7895612').then((todo) => {
    console.log(todo);
})
