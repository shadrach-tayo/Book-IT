const makeTodo = require("../src/todo");
const assert = require("assert");
const should = require("should");

describe("Todo", () => {
  describe("Makes Todo", () => {
    const todo = { text: "new todo" };
    const created = makeTodo(todo);

    it("returns a todo object", () => {
      should.exists(created);
    });

    it("has a valid text", () => {
      should.exists(created.text);
      assert.ok(
        typeof created.text === "string",
        "Created Text is not a valid string"
      );
    });

    it("has a same text", () => {
      assert.ok(
        created.text === todo.text,
        "Created Text is not equal to tod text"
      );
    });
  });

  describe("Empty text", () => {
    const todo = { text: null };
    let created = null;
    let error = null;
    before(() => {
      try {
        created = makeTodo(todo);
      } catch (err) {
        error = err;
      }
    });

    it("returns an error object", () => {
      should.exists(error);
      assert.ok(typeof error === "object", "error is not an object");
    });

    it("doesn't create todo", () => {
      assert.ok(created === null, "Created todo is not null");
    });

    it("returns an error message 'Text cannot be empty'", () => {
      assert.ok(
        error.message === "Text cannot be empty",
        "Error message not equal 'Text cannot be empty'"
      );
    });
  });

  describe("Less than 4 characters", () => {
    const todo = { text: "abc" };
    let created = null;
    let error = null;
    before(() => {
      try {
        created = makeTodo(todo);
      } catch (err) {
        error = err;
      }
    });

    it("returns an error object", () => {
      should.exists(error);
      assert.ok(typeof error === "object", "error is not an object");
    });

    it("doesn't create todo", () => {
      assert.ok(created === null, "Created todo is not null");
    });

    it("returns an error message 'Text must be at least 4 characters'", () => {
      assert.ok(
        error.message === "Text must be at least 4 characters",
        "Text must be at least 4 characters"
      );
    });
  });
});
