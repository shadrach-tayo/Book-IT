const makeTodo = require("../src/todo");
const assert = require("assert");
const should = require("should");

describe("migrate tests", () => {
  it("start migration", () => {
    expect(2).toEqual(2);
  });
});

describe("Todo", () => {
  describe("Makes Todo", () => {
    const todo = { text: "new todo" };
    const created = makeTodo(todo);

    it("returns a todo object", () => {
      expect(created).toBeDefined();
    });

    it("has a valid text", () => {
      expect(created.text).toBeDefined();
      expect(typeof created.text).toEqual("string");
    });

    it("has a same text", () => {
      expect(created.text).toEqual(todo.text);
    });
  });

  describe("Empty text", () => {
    const todo = { text: null };
    let created = null;
    let error = null;
    beforeAll(async () => {
      try {
        created = await makeTodo(todo);
      } catch (err) {
        error = err;
      }
    });

    it("returns an error object", () => {
      expect(error).toBeDefined();
      expect(typeof error).toEqual("object");
    });

    it("doesn't create todo", () => {
      expect(created).toBeNull();
    });

    it("returns an error message 'Text cannot be empty'", () => {
      expect(error.message).toEqual("Text cannot be empty");
    });
  });

  describe("Less than 4 characters", () => {
    const todo = { text: "abc" };
    let created = null;
    let error = null;
    beforeAll(async () => {
      try {
        created = await makeTodo(todo);
      } catch (err) {
        error = err;
      }
    });

    it("returns an error object", () => {
      expect(error).toBeDefined();
      expect(typeof error).toEqual("object");
    });

    it("doesn't create todo", () => {
      expect(created).toBeNull();
    });

    it("returns an error message 'Text must be at least 4 characters'", () => {
      expect(error.message).toEqual("Text must be at least 4 characters");
    });
  });
});
