const TodoController = ({
  addTodo,
  getTodos,
  getTodo,
  removeTodo,
  updateOne
}) => {
  /**
   * Funtion to handle creating a new Todo
   * @param {object} httpRequest
   */
  async function postTodo(httpRequest) {
    try {
      const { todo: todoInfo } = httpRequest.body;

      const todo = await addTodo(todoInfo);

      return {
        headers: { ...httpRequest.headers },
        body: {
          status: "success",
          message: "Todo successfully created",
          todo
        }
      };
    } catch (error) {
      return {
        headers: { ...httpRequest.headers },
        statusCode: 400,
        body: {
          status: "error",
          message: error.message
        }
      };
    }
  }

  async function updateTodo(httpRequest) {
    try {
      const { todo: todoInfo } = httpRequest.body;
      const { id } = httpRequest.params;

      const todo = await updateOne({ id, todoInfo });

      return {
        headers: { ...httpRequest.headers },
        body: {
          status: "success",
          message: "Todo successfully updated",
          todo
        }
      };
    } catch (error) {
      return {
        headers: { ...httpRequest.headers },
        statusCode: 400,
        body: {
          status: "error",
          message: error.message
        }
      };
    }
  }

  async function getAll(httpRequest) {
    try {
      const todos = await getTodos();
      return {
        body: {
          status: "success",
          message: "Todo successfully returned",
          todos
        }
      };
    } catch (error) {
      return {
        headers: { ...httpRequest.headers },
        statusCode: 400,
        body: {
          status: "error",
          message: error.message
        }
      };
    }
  }

  async function getOne(httpRequest) {
    try {
      const { id } = httpRequest.params;
      const todo = await getTodo(id);

      return {
        body: {
          status: "success",
          message: todo ? "Todo successfully returned" : "No Todo Found",
          todo
        }
      };
    } catch (error) {
      return {
        headers: { ...httpRequest.headers },
        statusCode: 400,
        body: {
          status: "error",
          message: error.message
        }
      };
    }
  }
  async function deleteTodo(httpRequest) {
    try {
      const { id } = httpRequest.params;
      const todo = await removeTodo(id);

      return {
        body: {
          status: "success",
          message: todo ? "Todo successfully removed" : "No Todo Found",
          todo
        }
      };
    } catch (error) {
      return {
        headers: { ...httpRequest.headers },
        statusCode: 400,
        body: {
          status: "error",
          message: error.message
        }
      };
    }
  }

  return { postTodo, getAll, getOne, deleteTodo, updateTodo };
};

module.exports = TodoController;
