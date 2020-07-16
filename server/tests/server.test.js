const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

var todos = [{
    _id: new ObjectID(),
    text: "First Todo work"
},{
    _id: new ObjectID(),
    text: "Second Todo work"
}];

beforeEach((done)=>{
    Todo.deleteMany({}).then(() => {
        return Todo.insertMany(todos);
    }).then(()=> done());
});

describe('POST /todos', () => {
    it('should create new todo', (done) => {
        var text = "Create New Test Todo";

        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if(err){
                    return done(err);
                }
                Todo.find({text}).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(res.body.text).toBe(text);
                    done();
                })
                .catch((e) => { done(e); });
            })
    });

    it('should not create todo', (done) => {
        request(app)
            .post('/todos')
            .send()
            .expect(400)
            .end((err, res) => {
                if(err){
                    return done(err);
                }
                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch((e)=> done(e));
            });
    });
});

describe('GET /todos', () => {
    it('Should get all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);
    });
   
});

describe('GET /todos/:id', () => {
    it('Should return a todo doc', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done);    
    });
// Id not found
    it('Should return 404 if id not found', (done) => {
        var hexId = new ObjectID().toHexString();
        request(app)
            .get(`/todos/${hexId}`)
            .expect(404)
            .end(done);
    });
// Non object id
    it('Should return 404 for non object ids', (done) => {
        var nonObejctID = '123';
        request(app)
            .get(`/todos/${nonObejctID}`)
            .expect(404)
            .end(done);
    });
});

describe('DELETE /todos/:id', ()=>{
    it('Should remove a todo', (done) =>{
        var hexId = todos[1]._id.toHexString();
        request(app)
        .delete(`/todos/${hexId}`)
        .expect(200)
        .expect((res) => {
            expect(res.body.todo._id).toBe(hexId);
        })
        .end((err, res) => {
            if(err){
                return done(err);
            }
            
            Todo.findById(hexId).then((todo) => {
                expect(todo).toNotExist();
                done();
            }).catch((e)=> done(e));
        });
    });

    it('Should return 404 if todo not found', (done)=> {
        var hexId = new ObjectID().toHexString();
        request(app)
            .delete(`/todos/${hexId}`)
            .expect(404)
            .end(done);
    });

    it('Should return 400 if Object id is invalid', (done)=> {
        var nonObejctID = '123';
        request(app)
            .delete(`/todos/${nonObejctID}`)
            .expect(404)
            .end(done);
    });

});