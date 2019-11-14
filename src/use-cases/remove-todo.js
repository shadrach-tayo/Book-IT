function makeRemoveTodo(todoDb) {
  return async function(id) {
    const results = await todoDb.findByIdAndDelete(id);
    return results;
  };
}

module.exports = makeRemoveTodo;
