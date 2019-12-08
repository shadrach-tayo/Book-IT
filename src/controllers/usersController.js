const UserController = ({ UserService }) => {
  /**
   * Funtion to handle creating a new user
   * @param {object} httpRequest
   */
  async function Signup(httpRequest) {
    try {
      const userData = httpRequest.body;
      const user = await UserService.Signup(userData);

      return {
        headers: {
          ...httpRequest.headers
        },
        body: {
          status: "success",
          message: "User successfully created",
          user
        }
      };
    } catch (error) {
      return {
        headers: {
          ...httpRequest.headers
        },
        statusCode: 400,
        body: {
          status: "error",
          message: error.message
        }
      };
    }
  }

  /**
   * Funtion to handle creating a new user
   * @param {object} httpRequest
   */
  async function Login(httpRequest) {
    try {
      const userData = httpRequest.body;
      const data = await UserService.Login(userData);

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

  /**
   * Funtion to handle returning a user
   * @param {object} httpRequest
   */
  async function getById(httpRequest) {
    try {
      const id = httpRequest.params.id;
      const user = await UserService.findById(id);

      return {
        headers: {
          ...httpRequest.headers
        },
        body: {
          status: "success",
          message: "User successfully logged In",
          user
        }
      };
    } catch (error) {
      return {
        headers: {
          ...httpRequest.headers
        },
        statusCode: 400,
        body: {
          status: "error",
          message: error.message
        }
      };
    }
  }

  /**
   *  Funtion to handle returning a single user's data
   * @param {object} httpRequest
   */
  async function getSingleUser(httpRequest) {
    try {
      // console.log("jwt data ", httpRequest.jwt);

      const { userId: id } = httpRequest.jwt;

      const user = await UserService.findById(id);

      return {
        headers: {
          ...httpRequest.headers
        },
        body: {
          status: "success",
          // message: "User successfully logged In",
          user
        }
      };
    } catch (error) {
      return {
        headers: {
          ...httpRequest.headers
        },
        statusCode: 400,
        body: {
          status: "error",
          message: error.message
        }
      };
    }
  }

  /**
   * Funtion to handle updating  user's data
   * @param {object} httpRequest
   */
  async function updateById(httpRequest) {
    try {
      const id = httpRequest.params.id;
      const user = httpRequest.body;

      const updatedUser = await UserService.updateUser({ id, user });

      return {
        headers: {
          ...httpRequest.headers
        },
        body: {
          status: "success",
          message: "Profile successfully updated",
          updatedUser
        }
      };
    } catch (error) {
      return {
        headers: {
          ...httpRequest.headers
        },
        statusCode: 400,
        body: {
          status: "error",
          message: error.message
        }
      };
    }
  }

  /**
   * Funtion to handle updating  user's data
   * @param {object} httpRequest
   */
  async function deleteById(httpRequest) {
    try {
      const id = httpRequest.params.id;
      // const user = httpRequest.body;

      const deletedUser = await UserService.removeUser(id);

      return {
        headers: {
          ...httpRequest.headers
        },
        body: {
          status: "success",
          message: "User successfully deleted",
          deletedUser
        }
      };
    } catch (error) {
      return {
        headers: {
          ...httpRequest.headers
        },
        statusCode: 400,
        body: {
          status: "error",
          message: error.message
        }
      };
    }
  }
  /**
   * Funtion to handle updating  user's data
   * @param {object} httpRequest
   */
  async function listUsers(httpRequest) {
    try {
      const users = await UserService.listAll();

      return {
        headers: {
          ...httpRequest.headers
        },
        body: {
          status: "success",
          // message: "User successfully logged In",
          users
        }
      };
    } catch (error) {
      return {
        headers: {
          ...httpRequest.headers
        },
        statusCode: 400,
        body: {
          status: "error",
          message: error.message
        }
      };
    }
  }

  return {
    Signup,
    Login,
    getById,
    updateById,
    listUsers,
    getSingleUser,
    deleteById
  };
};

module.exports = UserController;
