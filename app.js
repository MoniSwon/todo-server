const express = require('express');
var cors = require('cors')
const app = express();
const bodyParser = require("body-parser");
const mysql = require('mysql');
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: 'todo'
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());



app.listen(8080, () => {
    console.log('listening on port 8080')
})

// Route to get all todos
app.get('/api/todos', (req, res) => {
    db.query("SELECT * FROM todo", (err, result) => {
        if (err) {
            throw err;
        }
        res.status(200).send(result)
    })
})

// Route to get one todos
app.get("/api/todo/:id", (req, res) => {
    const id = req.params.id;
    db.query("SELECT * FROM todo WHERE id = ?", id,
        (err, result) => {
            if (err) {
                throw err;
            }
            res.status(200).send(result)
        })
})

app.post('/api/createTodo', (req, res) => {

    const title = req.body.title;
    const description = req.body.description;
    const dueDate = req.body.due_date;
    const status = req.body.status;
    const today = new Date();
    const creationDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' ' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const label = req.body.label;
    const user = req.body.user;

    db.query("INSERT INTO todo (title, description, due_date, status, creation_date, label, user) VALUES (?,?,?,?,?,?,?)", [title, description, dueDate, status, creationDate, label, user], (err, result) => {
        if (err) {
            console.log(err)
        }
        res.json({title: req.body.title,
            description:req.body.description,
            due_date:req.body.due_date,
            status:req.body.status,
            label:req.body.label,
            creation_date:creationDate,
            user:user,
            id:result.insertId})
    });
});

app.patch('/api/updateTodo', (req, res) => {
    const { id } = req.query;
    const { field } = req.query;
    const { value } = req.query;
    if (!id || !field || !value) {
        res.status(400).json(
            { error: 'one or more parameters is required!' }
        )
    }
    db.query(`UPDATE todo
                      SET \`${field}\` = '${value}'
                      WHERE \`todo\`.\`id\` = ${id};`,
        function (err, rows, fields) {
            res.json({ rows })
        });
});

app.delete('/api/deleteTodo', (req, res) => {
    const { id } = req.query;
    if(!id){
        res.status(400).json(
            { error: 'id parameters is required!' }
        )
    }
    db.query(`DELETE FROM todo WHERE \`todo\`.\`id\` = ${id}`,
        function(err, rows, fields) {
            res.json({rows})
        });
})

/* POST /api/todos -> 201 : Création d'une Todo
GET /api/todos -> 200 : Retourne la liste de nos Todos
PUT /api/todos/:todoid -> 200 : Modification partielle d'une Todo
DELETE /api/todo/:todoid -> 204 : Supprime une Todo */