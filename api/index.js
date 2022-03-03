const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express()
const port = 3000

let todos = [{
        "id": "1",
        "title": "Test1",
        "finished": false,
    },
    {
        "id": "2",
        "title": "Test2",
        "finished": true,
    },
    {
        "id": "3",
        "title": "Test3",
        "finished": false,
    }];

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('todo API');
});

app.get('/todos', (req, res) => {
    res.json(todos);
});

app.get('/todo/:id', (req, res) => {
    // reading id from the URL
    const id = req.params.id;

    // searching todos for the id
    for (let todo of todos) {
        if (todo.id === id) {
            res.json(todo);
            return;
        }
    }

    // sending 404 when not found something is a good practice
    res.status(404).send('todo not found');
});

app.post('/todo', (req, res) => {
    const todo = req.body;

    // output the todo to the console for debugging
    console.log(todo);
    todos.push(todo);

    res.send('todo is added to the database');
});

app.delete('/todo/:id', (req, res) => {
    // reading id from the URL
    const id = req.params.id;

    // remove item from the todos array
    todos = todos.filter(i => {
        if (i.id !== id) {
            return true;
        }

        return false;
    });

    // sending 404 when not found something is a good practice
    res.send('todo is deleted');
});

app.post('/todo/:id', (req, res) => {
    // reading id from the URL
    const id = req.params.id;
    const newTodo = req.body;

    // remove item from the todos array
    for (let i = 0; i < todos.length; i++) {
        let todo = todos[i]

        if (todo.id === id) {
            todos[i] = newTodo;
        }
    }

    // sending 404 when not found something is a good practice
    res.send('todo is edited');
});

app.listen(port, () => console.log(`todo app listening on port ${port}!`));