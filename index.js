// main.js

const express = require('express');
const bodyParser = require('body-parser');
const { sayHello, sayGoodbye } = require('./myModule'); // Importing functions from myModule.js

const app = express().use(bodyParser.json());

// Replace with your own verify token
const VERIFY_TOKEN = 'your_verify_token';

app.get('/webhook', (req, res) => {
  if (req.query['hub.mode'] === 'subscribe' &&
      req.query['hub.verify_token'] === VERIFY_TOKEN) {
    console.log('Webhook verified');
    res.status(200).send(req.query['hub.challenge']);
  } else {
    console.error('Failed validation. Make sure the validation tokens match.');
    res.sendStatus(403);
  }
});

// Utilizing the functions imported from myModule.js
app.get('/hello/:name', (req, res) => {
  const name = req.params.name;
  sayHello(name);
  res.send(`Hello, ${name}!`);
});

app.get('/goodbye/:name', (req, res) => {
  const name = req.params.name;
  sayGoodbye(name);
  res.send(`Goodbye, ${name}!`);
});

app.listen(3000, () => console.log('Server is running on port 3000'));
