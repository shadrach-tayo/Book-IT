const makeTodo = require("../todo");

function makeAddTodo(todoDb) {
  return async function(todoInfo) {
    const todo = makeTodo(todoInfo);

    const exists = await todoDb.findByText(todo.text);

    if (exists) {
      throw new Error("Todo already exists!!!");
    }

    return todoDb.insert(todo);
  };
}

module.exports = makeAddTodo;
