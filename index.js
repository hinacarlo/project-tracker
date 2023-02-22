import Kanban from "./kanban.js";

// console.log(Kanban.createTask(0, "Study MongoDB"));
// console.log(Kanban.getTasks(0));
// Kanban.deleteTask(34846);
// console.log(Kanban.getTasks(0));
console.log(Kanban.getAllTasks());
Kanban.updateTask(5567, {
  columnId: 2,
  content: "Study MongoDB",
});
