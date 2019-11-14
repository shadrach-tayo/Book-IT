function makeGetTodos(todoDb) {
  return async function() {
    const results = await todoDb.findAll();

    return results;
  };
}

module.exports = makeGetTodos;
