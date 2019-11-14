const { addTodo, getTodos, getTodo, removeTodo } = require("../use-cases");
const TodoController = require("./todoController");

const todoController = TodoController({
  addTodo,
  getTodos,
  getTodo,
  removeTodo
});

module.exports = todoController;
