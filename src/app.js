import express from 'express';
import cors from 'cors';

import isUrl from './validations/isUrl.js';

const app = express();
app.use(express.json());
app.use(cors());

const users = [];
const tweets = [];

app.post('/sign-up', (req, res) => {
  const user = req.body;
  if (!user.username || !isUrl(user.avatar)) {
    res.status(400).send('Todos os campos são obrigatórios!');
  } else {
    users.push(user);
    res.status(201).send('OK');
  }
});

app.post('/tweets', (req, res) => {
  const username = req.get('user');

  const { tweet } = req.body;

  if (!username || !tweet) {
    res.status(400).send('Todos os campos são obrigatórios!');
  } else {
    const { avatar } = users.find((user) => user.username === username);
    const formattedTweet = { username, tweet, avatar };

    tweets.unshift(formattedTweet);
    res.status(201).send('OK');
  }
});

app.get('/tweets', (req, res) => {
  const { page } = req.query;

  if (page < 1) {
    res.status(400).send('Informe uma página válida!');
  } else {
    const lastTenTweets = tweets.filter((tweet, index) => (
      index >= 10 * (page - 1) && index < 10 * page
    ));

    res.send(lastTenTweets);
  }
});

app.get('/tweets/:USERNAME', (req, res) => {
  const searchedUsername = req.params.USERNAME;

  const searchedUserTweets = tweets.filter((tweet) => tweet.username === searchedUsername);

  res.send(searchedUserTweets);
});

app.listen(5000);
