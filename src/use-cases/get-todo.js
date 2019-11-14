function makeGetTodo(todoDb) {
  return async function(id) {
    if (!id) throw new Error("You must supply the Id");

    const result = await todoDb.findById(id);

    return result;
  };
}

module.exports = makeGetTodo;
