const todoController = require("../controllers");
const makeCallback = require("./callback");
const multer = require("multer");

const upload = multer();

module.exports = router => {
  /* GET home page. */

  router.route("/").get(function(req, res, next) {
    res.render("index", { title: "Express" });
  });
  router.route("/todos").get(makeCallback(todoController.getAll));
  router.route("/todo/:id").get(makeCallback(todoController.getOne));
  // router.route("/todo/:id").put(makeCallback(todoController.updateTodo));
  // router.route("/todo/:id").put(makeCallback(todoController.getOne)); TODO!!!
  router.route("/todo/:id").delete(makeCallback(todoController.deleteTodo));
  router.put(
    "/todo/:id",
    upload.none(),
    makeCallback(todoController.updateTodo)
  );
  router.post(
    "/todo/create",
    upload.none(),
    makeCallback(todoController.postTodo)
  );
};
