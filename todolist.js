const formInput = document.querySelector(".form-input");
const todoInput = document.querySelector(".todo-input");
const todoUlList = document.querySelector(".todo-list");
const filterTodos = document.querySelector(".filter-todos");

let fiLterValue = "all";
formInput.addEventListener("submit", addTodo);

filterTodos.addEventListener("change", (e) => {
  fiLterValue = e.target.value;
  filterBaseOnOption();
});

document.addEventListener("DOMContentLoaded", (e) => {
  const todos = getAllTodos();
});

function addTodo(e) {
  e.preventDefault();
  if (!todoInput.value) return null;
  const newTodo = {
    id: Date.now(),
    createdAt: new Date().toISOString(),
    title: todoInput.value,
    isCompleted: false,
  };
  saveTodo(newTodo);
  filterBaseOnOption();
}
function filterBaseOnOption() {
  const todos = getAllTodos();
  switch (fiLterValue) {
    case "completed":
      const completedTodos = todos.filter((item) => item.isCompleted);
      createTodos(completedTodos);
      break;
    case "uncompleted":
      const unCompletedTodos = todos.filter((item) => !item.isCompleted);
      createTodos(unCompletedTodos);
      break;
    case "all":
      createTodos(todos);
      break;
    default:
      createTodos(todos);
  }
}
function createTodos(todos) {
  let result = "";
  todos.forEach((todo) => {
    result += `<li class=${
      todo.isCompleted ? "todo-item-completed" : "todo-item"
    }>
   <p class=${
     todo.isCompleted ? "todo-item-title-completed" : "todo-item-title"
   }>${todo.title}</p>
   <div class="todo-item-justify">
   <span class="todo-item-date">${new Date().toLocaleDateString("en-UK")}</span>
   <div class="todo-item-controllers">
   <button class="todo-item-tik" data-todo-id=${
     todo.id
   }><i class="fa-solid fa-check"></i></button>
  <button class="todo-item-remove" data-todo-id=${
    todo.id
  }><i class="fa fa-trash"></i></button>
   </div>
   </div>
   </li>
    `;
  });
  todoUlList.innerHTML = result;
  todoInput.value = "";
  const trashBtn = [...document.querySelectorAll(".todo-item-remove")];
  trashBtn.forEach((btn) => btn.addEventListener("click", removeTodo));
  const checkBtn = [...document.querySelectorAll(".todo-item-tik")];
  checkBtn.forEach((btn) => btn.addEventListener("click", checkTodo));
}
function removeTodo(e) {
  let todos = getAllTodos();
  const dataId = Number(e.target.dataset.todoId);
  todos = todos.filter((item) => item.id !== dataId);
  filterBaseOnOption();
  saveAllTodos(todos);
}
function checkTodo(e) {
  const todos = getAllTodos();
  const dataId = Number(e.target.dataset.todoId);
  const checkedTodo = todos.find((item) => item.id === dataId);
  checkedTodo.isCompleted = !checkedTodo.isCompleted;
  saveAllTodos(todos);
  filterBaseOnOption();
}

function getAllTodos() {
  const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
  return savedTodos;
}

function saveTodo(todo) {
  const savedTodos = getAllTodos();
  savedTodos.push(todo);
  localStorage.setItem("todos", JSON.stringify(savedTodos));
  return savedTodos;
}
function saveAllTodos(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
}
crea;
