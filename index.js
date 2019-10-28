// implement your API here
const express = require('express');
const db = require('./data/db');
const server = express();


server.use(express.json());


const port = 6669;
server.listen(port, () => console.log(`\n<<< Server Running on Port ${port} >>>\n`))