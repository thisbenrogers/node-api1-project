// implement your API here
const express = require('express');

const userModel = require('./data/db');

const server = express();

server.use(express.json());

server.post('/api/users', (req, res) => {

})

server.get('/api/users', (req, res) => {

})

server.get('/api/users/:id', (req, res) => {

})

server.delete('/api/users/:id', (req, res) => {

})

server.put('/api/users/:id', (req, res) => {
    
})