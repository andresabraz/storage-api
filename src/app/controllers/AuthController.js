const httpStatus = require('http-status');

const { User } = require('../models');

class AuthController {
  async register(req, res) {
    const { password, email } = req.body;

    try {
      if (await User.findOne({ where: { email } })) {
        return res
          .status(httpStatus.BAD_REQUEST)
          .json({ error: 'User already exists' });
      }

      const user = await User.create(req.body);

      user.password = undefined;
      user.password_hash = undefined;

      return res.send({ user });
    } catch (err) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ error: 'Registration failed' });
    }
  }
}

module.exports = new AuthController();
