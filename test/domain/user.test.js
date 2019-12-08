const { User } = require("../../src/domain");
const users = require("../mocks/user");

describe("User", () => {
  describe("Creates User", () => {
    const user = users[0];
    const created = User(user);

    it("returns a user object", () => {
      expect(created).toBeDefined();
    });

    it("has a valid firstname", () => {
      expect(created.firstname).toBeDefined();
      expect(typeof created.firstname).toEqual("string");
    });

    it("has a valid lastname", () => {
      expect(created.lastname).toBeDefined();
      expect(typeof created.lastname).toEqual("string");
    });

    it("has a valid username", () => {
      expect(created.username).toBeDefined();
      expect(typeof created.username).toEqual("string");
    });

    it("has a valid email", () => {
      expect(created.email).toBeDefined();
      expect(typeof created.email).toEqual("string");
    });

    it("has a valid phone", () => {
      expect(created.phone).toBeDefined();
      expect(typeof created.phone).toEqual("number");
    });

    it("has a valid city", () => {
      expect(created.city).toBeDefined();
      expect(typeof created.city).toEqual("string");
    });

    it("has a valid street", () => {
      expect(created.street).toBeDefined();
      expect(typeof created.street).toEqual("string");
    });

    it("has a valid zip code", () => {
      expect(created.zip).toBeDefined();
      expect(typeof created.zip).toEqual("number");
    });
  });

  //   describe("Empty text", () => {
  //     const todo = { text: null };
  //     let created = null;
  //     let error = null;
  //     beforeAll(async () => {
  //       try {
  //         created = await makeTodo(todo);
  //       } catch (err) {
  //         error = err;
  //       }
  //     });

  //     it("returns an error object", () => {
  //       expect(error).toBeDefined();
  //       expect(typeof error).toEqual("object");
  //     });

  //     it("doesn't create todo", () => {
  //       expect(created).toBeNull();
  //     });

  //     it("returns an error message 'Text cannot be empty'", () => {
  //       expect(error.message).toEqual("Text cannot be empty");
  //     });
  //   });

  //   describe("Less than 4 characters", () => {
  //     const todo = { text: "abc" };
  //     let created = null;
  //     let error = null;
  //     beforeAll(async () => {
  //       try {
  //         created = await makeTodo(todo);
  //       } catch (err) {
  //         error = err;
  //       }
  //     });

  //     it("returns an error object", () => {
  //       expect(error).toBeDefined();
  //       expect(typeof error).toEqual("object");
  //     });

  //     it("doesn't create todo", () => {
  //       expect(created).toBeNull();
  //     });

  //     it("returns an error message 'Text must be at least 4 characters'", () => {
  //       expect(error.message).toEqual("Text must be at least 4 characters");
  //     });
  //   });
});
