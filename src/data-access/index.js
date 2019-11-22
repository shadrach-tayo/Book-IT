const makeTodoDb = require("./todoDb");
const TodoModel = require("../models/Todo");

const todoDb = makeTodoDb(TodoModel);

module.exports = { todoDb };
