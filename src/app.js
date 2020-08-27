require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

class AppController {
  constructor() {
    this.express = express();
    this.express.use(helmet());
    this.express.use(
      morgan(process.env.NODE_ENV === 'production' ? 'tiny' : 'dev')
    );

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: false }));
  }

  routes() {
    this.express.use(require('./routes'));
  }
}

module.exports = new AppController().express;
