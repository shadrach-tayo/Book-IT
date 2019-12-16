const authController = ({ AuthService }) => {
  async function refreshToken(req, res) {
    try {
      const token = await AuthService.refreshToken(req.jwt);
      res.status(201).send({ access_token: token });
    } catch (err) {
      res.status(500).send({ errors: err });
    }
  }

  /**
   * Funtion to handle authenticating a user
   * @param {object} httpRequest
   */
  async function Login(httpRequest) {
    try {
      const userData = httpRequest.body;
      const data = await AuthService.Login(userData);

      return {
        headers: {
          ...httpRequest.headers
        },
        statusCode: 201,
        body: {
          status: "success",
          message: "User successfully logged In",
          data
        }
      };
    } catch (error) {
      return {
        headers: {
          ...httpRequest.headers
        },
        statusCode: 500,
        body: {
          status: "error",
          message: error.message
        }
      };
    }
  }

  return { refreshToken, Login };
};

module.exports = authController;
