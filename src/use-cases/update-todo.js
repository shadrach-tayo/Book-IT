function makeupdateOne(todoDb) {
  return async function({ id, todoInfo }) {
    const result = await todoDb.findByIdAndUpdate(id, todoInfo);

    return result;
  };
}

module.exports = makeupdateOne;
