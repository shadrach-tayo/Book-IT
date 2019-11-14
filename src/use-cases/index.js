const makeAddTodo = require("./add-todo");
const makeGetTodos = require("./get-todos");
const makeGetTodo = require("./get-todo");
const makeRemoveTodo = require("./remove-todo");
const { todoDb } = require("../data-access");

const addTodo = makeAddTodo(todoDb);
const getTodos = makeGetTodos(todoDb);
const getTodo = makeGetTodo(todoDb);
const removeTodo = makeRemoveTodo(todoDb);

module.exports = { addTodo, getTodos, getTodo, removeTodo };
