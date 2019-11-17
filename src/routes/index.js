const todoController = require("../controllers");
const makeCallback = require("./callback");

module.exports = router => {
  /* GET home page. */

  router.route("/").get(function(req, res, next) {
    res.render("index", { title: "Express" });
  });
  router.route("/todos").get(makeCallback(todoController.getAll));
  router.route("/todo/:id").get(makeCallback(todoController.getOne));
  router.route("/todo/:id").put(makeCallback(todoController.updateTodo));
  // router.route("/todo/:id").put(makeCallback(todoController.getOne)); TODO!!!
  router.route("/todo/:id").delete(makeCallback(todoController.deleteTodo));
  router.route("/todo/create").post(makeCallback(todoController.postTodo));
};
