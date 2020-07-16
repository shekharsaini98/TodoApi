const {ObjectID} = require('mongodb');

const {moongoose} = require('../server/db/mongoose');
const {Todo} = require('../server/models/todo');


 const id = "5f00f49a5a1ef90530d50569";
// Is valid
if(!ObjectID.isValid(id)){
    console.log('Invalid Id');
}


// Find
 Todo.find({
     _id: id
 }).then((todos) => {
     console.log(todos);
 })
//  Find One
 Todo.findOne({
    _id: id
}).then((todos) => {
    console.log(todos);
})
//  Find One By ID
Todo.findById({
    _id: id
}).then((todo) => {
    if(!todo){
        return console.log('Id Not Found');
    }
    console.log('By id', todo);
});
