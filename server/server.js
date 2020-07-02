const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 5000;

// This must be added before GET & POST routes.
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// Serve up static files (HTML, CSS, Client JS)
app.use(express.static('server/public'));
//static files are already in place

const minNum = 1;
const maxNum = 25;
let ranNumAnswer = 0;
let history = [];

//each item in history will represent a route

// TODO: function that generates random number
function randomNumber(min, max) {
  return Math.floor(Math.random() * (1 + max - min) + min);
}

// TODO: GET & POST Routes go here

// TODO: GET for all guess history

app.get('/api/guesses', (req, res) => {
  res.send(history);
});

// TODO: POST to receive my round of guesses

// TEST IN POSTMAN!!!!!

app.post('/api/guesses', (req, res) => {
  const playerGuesses = req.body;
  let result = null;
  //req.body structure
  // {
  //   players: [{
  //     name: 'string'
  //     guess: number, playerGuesses.players[i].result = 'correct
  ; //   }]}

  for (let i = 0; i < playerGuesses.players.length; i++) {
    const playerGuess = playerGuesses.players[i];

    if (playerGuess.guess === ranNumAnswer) {
      result = 'correct';
    } else if (playerGuess.guess < ranNumAnswer) {
      result = "low";
    } else if (playerGuesses.guess >
      result = 'high';
    }

  }
  // come back to 11:16am mark

  history.push(playerGuesses);
  console.log(history);
  res.sendStatus(201);

  // TODO: use these above code comments, later in this assignment.

});

// get something off req first using req.body 
// TODO: POST to reset all random number
app.post('/api/reset', (req, res) => {
  history = [];
  ranNumAnswer = randomNumber(minNum, maxNum);
  res.sendStatus(201);
});

app.listen(PORT, () => {
  ranNumAnswer = randomNumber(minNum, maxNum);
  console.log('RANDOM:', ranNumAnswer);
  console.log('Server is running on port', PORT)
});