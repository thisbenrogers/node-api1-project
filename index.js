const express = require('express');

const userModel = require('./data/db');

const server = express();

server.use(express.json());

server.post('/api/users', (req, res) => {
    const userData = req.body;

    if (!userData.name || !userData.bio) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
    } else {
        userModel
            .insert(userData)
            .then(id => {
                res.json(id);
            })
            .catch(error => {
                res.status(500).json({ error: "There was an error while saving the user to the database" });
            })
    }
})


server.get('/api/users', (req, res) => {
    userModel
        .find()
        .then(users => {
            res.send(users);
        })
        .catch(error => {
            res.status(500).json({ error: "The users information could not be retrieved." });
        });
})

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;

    if (!id) {
        res.status(404).json({ message: "The user with the specified ID does not exist." });
    } else {
        userModel
            .findById(id)
            .then(user => {
                res.send(user);
            })
            .catch(error => {
                res.status(500).json({ error: "The user information could not be retrieved." });
            });
    }
})

server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;

    if (!id) {
        res.status(404).json({ message: "The user with the specified ID does not exist." });
    } else {
    userModel
        .remove(id)
        .then(num => {
            res.json({ message: `${num} user(s) were removed`})
        })
        .catch(error => {
            res.status(500).json({ error: "The user could not be removed" });
        })
    }
})

server.put('/api/users/:id', (req, res) => {

})


const port = 8000;
server.listen(port, () => console.log('\nserver running\n'));