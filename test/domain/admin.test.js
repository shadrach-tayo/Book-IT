const { Admin } = require("../../src/domain");

const admindata = { email: "admin@gmail.com", password: "asylum" };

describe("admin", () => {
  describe("Creates admin", () => {
    const created = Admin(admindata);

    it("returns a admin object", () => {
      expect(created).toBeDefined();
    });

    it("has a valid admin email", () => {
      expect(created.email).toBeDefined();
      expect(typeof created.email).toEqual("string");
    });
  });
});
