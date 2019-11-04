const express = require('express');
const helmet = require('helmet');
// const postRouter = require('./posts/postDb');
const userRouter = require('./users/userRouter');

const server = express();

server.use(helmet());

server.use(express.json());

server.use((req, res, next) => {
  console.log('Yay it worked!!')
  next();
})

server.use('/api/users', logger, userRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

//custom middleware

function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get(
      'Origin'
    )}`
  );
  next();
}

module.exports = server;
