const routes = require('express').Router();
const multer = require('multer');
const multerConfig = require('./config/multer');

const authMiddleware = require('./app/middleware/auth');
const AuthController = require('./app/controllers/AuthController');
const SessionController = require('./app/controllers/SessionController');
const StorageController = require('./app/controllers/StorageController');

routes.post(
  '/sendfile',
  multer(multerConfig).single('file'),
  StorageController.store
);

routes.post('/register', AuthController.register);

routes.post('/session', SessionController.store);

routes.use(authMiddleware);

routes.get('/dashboard', (req, res) => {
  return res
    .status(200)
    .send({ loggedUserId: req.userId, message: 'Welcome to dashboard' });
});

module.exports = routes;
