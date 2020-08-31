const httpStatus = require('http-status');

const { Storage } = require('../models');

class StorageController {
  async store(req, res) {
    try {
      const { originalname: name, size, key, location: url = '' } = req.file;

      const storage = await Storage.create({
        name,
        size,
        key,
        url,
      });

      return res.send({ storage });
    } catch (err) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ error: 'Failed to storage the sended file' });
    }
  }

  async index(req, res) {
    try {
      const files = await Storage.findAll();

      return res.send(files);
    } catch (err) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ error: 'Failed to locate files on the storage' });
    }
  }

  async destroy(req, res) {
    try {
      const fileStorage = await Storage.findByPk(req.params.id);

      if (fileStorage === null) {
        return res.send(httpStatus.NOT_FOUND);
      } else {
        await fileStorage.destroy();

        return res.sendStatus(httpStatus.OK);
      }
    } catch (err) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ error: 'Failed to delete file in the storage' });
    }
  }
}

module.exports = new StorageController();
