const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express()
const port = 3001

let todos = [];

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    todos = [{
        "text": "Test1",
        "isDone": false,
    },
    {
        "text": "Test2",
        "isDone": true,
    },
    {
        "text": "Test3",
        "isDone": false,
    }];    
    res.send(todos);
});

app.get('/todo', (req, res) => {
    res.json({
        apiMsg: 'get all todos',
        todos: todos
    });
});

app.get('/todo/:id', (req, res) => {
    const id = req.params.id;
    if(todos[id]) {
        res.json(todos[id]);
        return
    }

    // sending 404 when not found something is a good practice
    res.status(404).send('todo not found');
});

app.post('/todo', (req, res) => {
    const todo =  req.body;
    todo.isDone = false;
    todos.push(todo);

    res.send('todo is added to the list');
});

app.delete('/todo/:id', (req, res) => {
    const id = req.params.id;
    todos.splice(id, 1);

    //res.send('todo is deleted');
    res.json({
        apiMsg: 'todo is deleted',
        todos: todos
    });
});

app.put('/todo/:id', (req, res) => {
    const id = req.params.id;
    todos[id]['isDone'] = !todos[id]['isDone'];
    res.send('todo is edited');
});

app.listen(port, () => console.log(`todo app listening on port ${port}!`));