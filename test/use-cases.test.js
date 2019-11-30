// const request = require("supertest");
// const app = require("../src/app");
// const { db } = require("../src/app");
// const mongoose = require("mongoose");

// describe("Todo uses cases or services", () => {
//   beforeAll(async done => {
//     mongoose.connection.on("connected", () => {
//       done();
//     });
//   });

//   afterAll(async () => {
//     await db.collection("todos").deleteMany();
//   });

//   describe("Add Todo", () => {
//     const todo = {
//       text: "Todoist"
//     };
//     let res = null;

//     beforeAll(async done => {
//       res = await request(app)
//         .post("/todo/create")
//         .send(todo);

//       done();
//     });

//     it("successfully Adds Todo", async () => {
//       expect(res.statusCode).toEqual(200);
//       expect(res.body.todo.text).toEqual(todo.text);
//       expect(res.body.todo._id).toBeDefined();
//     });
//   });

//   describe("Todo Already Exits", () => {
//     const todo = {
//       text: "Todoist"
//     };
//     let res = null;

//     beforeAll(async () => {
//       res = await request(app)
//         .post("/todo/create")
//         .send(todo);
//     });

//     it("returns an error status", () => {
//       expect(res.body.status).toEqual("error");
//     });

//     it("doesn't create todo", () => {
//       expect(res.body.todo).toBeUndefined();
//     });

//     it("returns an error message 'Todo already exists!!!'", () => {
//       expect(res.body.message).toBe("Todo already exists!!!");
//     });
//   });

//   describe("Get Todos", () => {
//     const todo1 = {
//       text: "Todoist1"
//     };
//     const todo2 = {
//       text: "Todoist2"
//     };
//     let created1 = null;
//     let created2 = null;
//     todos = [];

//     beforeAll(async () => {
//       await db.collection("todos").deleteMany();

//       created1 = await request(app)
//         .post("/todo/create")
//         .send(todo1);

//       created2 = await request(app)
//         .post("/todo/create")
//         .send(todo2);

//       todos = await request(app).get("/todos");
//     });

//     it("successfully Gets Todos", () => {
//       expect(created1.body).toBeDefined();
//       expect(created2.body).toBeDefined();

//       expect(created1.body.todo.text).toBeDefined();
//       expect(created2.body.todo.text).toBeDefined();

//       expect(created1.body.todo.text).toEqual("Todoist1");
//       expect(created2.body.todo.text).toEqual("Todoist2");
//     });

//     it("Returns 2 todos", () => {
//       expect(todos.body.todos.length).toEqual(2);
//     });
//   });

//   describe("Get Todo", () => {
//     const todo1 = {
//       text: "Todoist3"
//     };

//     let created = null;
//     let result = null;

//     beforeAll(async () => {
//       created = await request(app)
//         .post("/todo/create")
//         .send(todo1);

//       result = await request(app).get(`/todo/${created.body.todo._id}`);
//     });

//     it("successfully Gets a single Todo item", () => {
//       expect(result.body).toBeDefined();

//       expect(result.body.todo.text).toBeDefined();

//       expect(result.body.todo.text).toEqual("Todoist3");

//       expect(result.body.status).toEqual("success");

//       expect(result.body.todo._id).toBeDefined();
//     });
//   });

//   describe("Remove Todo", () => {
//     const todo1 = { text: "first todo" };
//     let created = null;
//     let deleted = null;

//     beforeAll(async done => {
//       created = await request(app)
//         .post("/todo/create")
//         .send(todo1);

//       deleted = await request(app).delete(`/todo/${created.body.todo._id}`);

//       result = await request(app).get(`/todo/${deleted.body.todo._id}`);
//       done();
//     });

//     it("successfully Removes Todo", () => {
//       expect(deleted.body).toBeDefined();

//       expect(deleted.body.todo.text).toBeDefined();

//       expect(deleted.body.todo.text).toEqual("first todo");

//       expect(deleted.body.status).toEqual("success");

//       expect(deleted.body.todo._id).toEqual(created.body.todo._id);

//       expect(deleted.body.message).toEqual("Todo successfully removed");
//     });

//     it("returns null for removed todo", () => {
//       expect(result.body).toBeDefined();

//       expect(result.body.todo).toBeNull();

//       expect(result.body.status).toEqual("success");

//       expect(result.body.message).toEqual("No Todo Found");
//     });
//   });

//   describe("Update Todo", () => {
//     const todo = { text: "create" };
//     let created = null;
//     let updated = null;

//     beforeAll(async done => {
//       created = await request(app)
//         .post("/todo/create")
//         .send(todo);

//       updated = await request(app)
//         .put(`/todo/${created.body.todo._id}`)
//         .send({ text: "updated todo" });
//       done();
//     });

//     it("successfully Updates Todo", () => {
//       expect(updated.body).toBeDefined();

//       expect(updated.body.todo.text).toBeDefined();

//       expect(updated.body.todo.text).toEqual("updated todo");

//       expect(updated.body.status).toEqual("success");

//       expect(updated.body.todo._id).toEqual(created.body.todo._id);

//       expect(updated.body.message).toEqual("Todo successfully updated");
//     });
//   });
// });
