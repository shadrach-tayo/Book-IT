const { addTodo, getTodo, getTodos, removeTodo } = require("../src/use-cases");
const assert = require("assert");
const should = require("should");

describe("Todo uses cases or services", () => {
  describe("Add Todo", () => {
    const todo = { text: "Todoist" };
    let created = null;

    before(async () => {
      created = await addTodo(todo);
    });

    it("successfully Adds Todo", () => {
      should.exists(created);
      created.text.should.be.defined;
      created.id.should.be.defined;
      assert.ok(
        created.text === "Todoist",
        "created todo text not equal 'Todoist'"
      );
    });
  });

  describe("Todo Already Exits", () => {
    const todo = { text: "Todoist" };
    let created = null;
    let error = null;

    before(async () => {
      try {
        created = await addTodo(todo);
        created = await addTodo(todo);
      } catch (err) {
        error = err;
      }
    });

    it("returns an error object", () => {
      should.exists(error);
      assert.ok(typeof error === "object", "error is not an object");
    });

    it("doesn't create todo", () => {
      assert.ok(created === null, "Created todo should be null");
    });

    it("returns an error message 'Todo already exists!!!'", () => {
      assert.ok(
        error.message === "Todo already exists!!!",
        "Error message not equal 'Todo already exists!!!'"
      );
    });
  });

  describe("Get Todos", () => {
    const todo1 = { text: "Todoist1" };
    const todo2 = { text: "Todoist2" };
    let created1 = null;
    let created2 = null;
    todos = [];

    before(async () => {
      created1 = await addTodo(todo1);
      created2 = await addTodo(todo2);
      todos = await getTodos();
    });

    it("successfully Gets Todos", () => {
      should.exists(created1);
      should.exists(created2);

      created1.text.should.be.defined;
      created2.text.should.be.defined;

      created1.id.should.be.defined;
      created2.id.should.be.defined;

      assert.ok(
        created1.text === "Todoist1",
        "created todo text not equal 'Todoist'"
      );
      assert.ok(
        created2.text === "Todoist2",
        "created todo text not equal 'Todoist'"
      );
    });

    it("Returns 2 todos", () => {
      todos.length.should.equal(3);
    });
  });

  describe("Get Todo", () => {
    const todo1 = { text: "Todoist3" };

    let creted = null;
    let result = null;

    before(async () => {
      created = await addTodo(todo1);
      result = await getTodo(created.id);
    });

    it("successfully Gets a single Todo item", () => {
      should.exists(result);

      result.text.should.be.defined;

      result.id.should.be.defined;

      assert.ok(
        result.text === "Todoist3",
        "created todo text not equal 'Todoist'"
      );
    });
  });

  describe("Remove Todo", () => {
    const todo1 = { text: "first todo" };
    let created1 = null;
    let deleted1 = null;

    before(async () => {
      created1 = await addTodo(todo1);
      deleted1 = await removeTodo(created1.id);
    });

    it("successfully Removes Todo", () => {
      should.exists(deleted1);

      deleted1.text.should.be.defined;

      deleted1.id.should.be.defined;

      assert.ok(
        deleted1.text === "first todo",
        "deleted todo text not equal 'first todo'"
      );

      deleted1.text.should.equal(created1.text);
    });
  });
});
