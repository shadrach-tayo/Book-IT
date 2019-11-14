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
    console.log("found ", found);
    return found;
  };

  findByIdAndDelete = id => {
    const found = findById(id);
    if (!found) return null;

    todoList = todoList.filter(todo => todo.id !== found.id);
    console.log("todolist updated ", todoList.length);

    return found;
  };

  return { insert, findAll, findByText, findById, findByIdAndDelete };
};

module.exports = makeTodoDb;
