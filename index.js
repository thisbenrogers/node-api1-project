// implement your API here
const express = require('express');
const db = require('./data/db');
const server = express();


server.use(express.json());

server.post('/api/users', (req, res) => {
  const userData = req.body;
  if (!userData.name || !userData.bio) {
    res.status(400).json({ message: "Please provide name and bio for the user." });
  } else {
    db.insert(userData)
    .then(user => {
      res.status(201)
        .json(user);
    })
    .catch(err => {
      res.status(500).json({ message: 'There was an error while saving the user to the database' });
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
      res.status(500).json({ message: 'The users information could not be retrieved.' });
    })
});

server.get('/api/users/:id', (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(404).json({ message: "The user with the specified id does not exist." });
  } else {
    db.findById(id)
    .then(user => {
      res.status(201).json(user)
    })
    .catch(err => {
      res.status(500).json({ message: 'The user information could not be retrieved.' });
    })
  }
});

server.delete('/api/users/:id', (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(404).json({ message: "The user with the specified ID does not exist." })
  }
  db.remove(id)
   .then(user => {
     res.json(user);
   })
    .catch(err => {
      res.status(500).json({ message: 'The user could not be removed' });
    })
});

server.put('/api/users/:id', (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  if (!id) {
    res.status(404).json({ message: "The user with the specified ID does not exist." })
  } else if (!changes.name || !changes.bio) {
    res.status(400).json({ message: 'Please provide name and bio for the user.' })
  }
  db.update(id, changes)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(500).json({ message: 'The user information could not be modified.' });
    })
})

const port = 6669;
server.listen(port, () => console.log(`\n<<< Server Running on Port ${port} >>>\n`))