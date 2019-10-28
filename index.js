// implement your API here
const express = require('express');
const db = require('./data/db');
const server = express();


server.use(express.json());

server.post('/api/users', (req, res) => {
  const userData = req.body;
  if (!userData) {
    res.status(400).json({ message: "Users need a name and bio" });
  } else {
    db.insert(userData)
    .then(user => {
      res.status(201)
        .json(user);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error saving the user' });
    });
  }
});

server.get('/api/users', (req, res) => {
  db.find()
    .then(users => {
      res.status(201)
        .json(users);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error getting the users' });
    })
});

server.get('/api/users/:id', (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(400).json({ message: "There is not a user with that id" });
  } else {
    db.findById(id)
    .then(user => {
      res.status(201).json(user)
    })
    .catch(err => {
      res.status(500).json({ message: 'Error getting the user' });
    })
  }
});

server.delete('/api/users/:id', (req, res) => {
  const id = req.params.id;
  db.remove(id)
   .then(user => {
     res.json(user);
   })
    .catch(err => {
      res.status(500).json({ message: 'Error deleting the User' });
    })
});

server.put('/api/users/:id', (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  db.update(id, changes)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error updating the User' });
    })
})

const port = 6669;
server.listen(port, () => console.log(`\n<<< Server Running on Port ${port} >>>\n`))