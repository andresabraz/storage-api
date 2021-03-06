const httpStatus = require('http-status');

const { User } = require('../models');

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({ message: 'User not found' });
    }

    if (!(await user.checkPassword(password))) {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({ message: 'Invalid password' });
    }

    user.password_hash = undefined;

    return res.json({
      user,
      token: user.generateToken(),
    });
  }
}

module.exports = new SessionController();
