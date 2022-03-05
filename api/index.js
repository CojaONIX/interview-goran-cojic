const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express()
const port = 3001

let todos = [{
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

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('todo API');
});

app.get('/todo', (req, res) => {
    res.json(todos);
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
    todos.push(todo);
    console.log(todo);    

    res.send('todo is added to the database');
});

app.delete('/todo/:id', (req, res) => {
    const id = req.params.id;
    todos.splice(id, 1);

    // remove item from the todos array
    // todos = todos.filter(i => {
    //     if (i.id !== id) {
    //         return true;
    //     }

    //     return false;
    // });

    // sending 404 when not found something is a good practice
    res.send('todo is deleted');
});

app.put('/todo/:id', (req, res) => {
    const id = req.params.id;
    todos[id]['isDone'] = !todos[id]['isDone'];
    res.send('todo is edited');
});

app.listen(port, () => console.log(`todo app listening on port ${port}!`));