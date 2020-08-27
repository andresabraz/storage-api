const httpStatus = require('http-status');

const { Storage } = require('../models');

class StorageController {
  async store(req, res) {
    try {
      const { originalname: name, size, filename: key } = req.file;

      const storage = await Storage.create({
        name,
        size,
        key,
        url: '',
      });

      res.send({ storage });
    } catch (err) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ error: 'Failed to storage the sended file' });
    }
  }
}

module.exports = new StorageController();
