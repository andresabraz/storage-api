const routes = require('express').Router();
const multer = require('multer');
const multerConfig = require('./config/multer');

const authMiddleware = require('./app/middleware/auth');
const AuthController = require('./app/controllers/AuthController');
const SessionController = require('./app/controllers/SessionController');
const StorageController = require('./app/controllers/StorageController');

routes.post('/register', AuthController.register);

routes.post('/session', SessionController.store);

routes.use(authMiddleware);

routes.post(
  '/uploadfile',
  multer(multerConfig).single('file'),
  StorageController.store
);

routes.get('/files', StorageController.index);

routes.delete('/files/:id', StorageController.destroy);

module.exports = routes;
