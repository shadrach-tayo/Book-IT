const authController = ({ AuthService }) => {
  async function refreshToken(req, res) {
    try {
      req.body = req.jwt;
      let token = jwt.sign(req.body, jwtSecret);
      res.status(201).send({ id: token });
    } catch (err) {
      res.status(500).send({ errors: err });
    }
  }
  return { refreshToken };
};

module.exports = authController;
