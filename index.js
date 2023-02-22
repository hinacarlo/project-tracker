import Kanban from "./kanban.js";

const todo = document.querySelector(".cards.todo");
const pending = document.querySelector(".cards.pending");
const completed = document.querySelector(".cards.completed");

const taskbox = [todo, pending, completed];

const addTaskCard = (task, indx) => {
  const element = document.createElement("form");
  element.className = "card";
  element.draggable = true;
  element.dataset.id = task.taskId;
  element.innerHTML = `
    <input type="text" name="task" autocomplete="off" disabled value="${task.content}" />
    <div>
      <span class="task-id">#${task.taskId}</span>
      <span>
        <button class="bi bi-pencil edit" data-id="${task.taskId}"></button>
        <button
          class="bi bi-check-lg update hide" data-id="${task.taskId}" data-column='${indx}'></button>
        <button class="bi bi-trash3 delete" data-id="${task.taskId}"></button>
      </span>
    </div>`;

  taskbox[indx].appendChild(element);
};

Kanban.getAllTasks().forEach((tasks, indx) => {
  tasks.forEach((task) => {
    addTaskCard(task, indx);
  });
});

const addForm = document.querySelectorAll(".add");
addForm.forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (form.task.value) {
      const task = Kanban.createTask(
        form.submit.dataset.id,
        form.task.value.trim()
      );
      addTaskCard(task, form.submit.dataset.id);
      form.reset();
    }
  });
});

taskbox.forEach((column) => {
  column.addEventListener("click", (event) => {
    event.preventDefault();

    const formInput =
      event.target.parentElement.parentElement.previousElementSibling;

    if (event.target.classList.contains("edit")) {
      formInput.removeAttribute("disabled");
      event.target.classList.add("hide");
      event.target.nextElementSibling.classList.remove("hide");
    }

    if (event.target.classList.contains("update")) {
      formInput.setAttribute("disabled", true);
      event.target.classList.add("hide");
      event.target.previousElementSibling.classList.remove("hide");

      const taskId = event.target.dataset.id;
      const columnId = event.target.dataset.column;
      const content = formInput.value;

      Kanban.updateTask(taskId, {
        columnId,
        content,
      });
    }

    if (event.target.classList.contains("delete")) {
      formInput.parentElement.remove();
      Kanban.deleteTask(event.target.dataset.id);
    }
  });
});
