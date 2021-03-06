const AdminController = ({ AdminService }) => {
  /**
   * Funtion to handle creating a new user
   * @param {object} httpRequest
   */
  async function Signup(httpRequest) {
    try {
      const userData = { ...httpRequest.body, role: "admin" };
      // console.log("new admin ", userData);
      const admin = await AdminService.Signup(userData);

      return {
        headers: {
          ...httpRequest.headers
        },
        body: {
          status: "success",
          message: "User successfully created",
          admin
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
  return { Signup };
};

module.exports = AdminController;
