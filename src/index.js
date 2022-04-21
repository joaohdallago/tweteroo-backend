import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

const users = [{
  username: 'jao',
  avatar: 'https://bit.ly/goku-profile',
}];
const tweets = [];

app.post('/sign-up', (req, res) => {
  const user = req.body;
  users.push(user);
  res.send('OK');
});

app.post('/tweets', (req, res) => {
  const { username } = req.body;
  const { avatar } = users.find((user) => user.username === username);

  const tweet = { ...req.body, avatar };

  tweets.unshift(tweet);
  res.send('OK');
});

app.get('/tweets', (req, res) => {
  const lastTenTweets = tweets.filter((tweet, index) => index < 10);

  res.send(lastTenTweets);
});

app.listen(5000);
