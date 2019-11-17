const {
  addTodo,
  getTodos,
  getTodo,
  removeTodo,
  updateOne
} = require("../use-cases");
const TodoController = require("./todoController");

const todoController = TodoController({
  addTodo,
  getTodos,
  getTodo,
  removeTodo,
  updateOne
});

module.exports = todoController;
