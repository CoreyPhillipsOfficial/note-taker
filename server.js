const express = require('express');
const devTools = require('./Develop');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('./public'))
app.use(express.json());

