const generateId = () =>
  Math.random()
    .toString(36)
    .substring(2, 15) +
  Math.random()
    .toString(36)
    .substring(2, 15);

const makeTodoDb = () => {
  let todoList = [];

  const insert = todo => {
    const toInsert = { ...todo, id: generateId() };
    todoList.push(toInsert);

    return toInsert;
  };

  findAll = () => todoList;

  findByText = text => {
    const found = todoList.find(todo => todo.text === text) || null;
    console.log("found ", found);
    return found;
  };

  findById = id => {
    const found = todoList.find(todo => todo.id === id) || null;

    return found;
  };

  findByIdAndDelete = id => {
    const found = findById(id);
    if (!found) return null;

    todoList = todoList.filter(todo => todo.id !== found.id);
    console.log("todolist updated ", todoList.length);

    return found;
  };

  findByIdAndUpdate = (id, update) => {
    if (!id) throw new Error("Id must be supplied");

    const found = findById(id);
    if (!found) throw new Error("Todo doesnt exists");

    todoList = todoList.map(todo => {
      if (todo.id == found.id) return { ...todo, ...update };
      return todo;
    });

    const updated = findById(id);
    return updated;
  };

  return {
    insert,
    findAll,
    findByText,
    findById,
    findByIdAndDelete,
    findByIdAndUpdate
  };
};

module.exports = makeTodoDb;
