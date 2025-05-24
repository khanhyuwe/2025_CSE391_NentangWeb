let tasks = [];

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const filterSelect = document.getElementById("filter");

addTaskBtn.addEventListener("click", addTask);
filterSelect.addEventListener("change", renderTasks);
document.addEventListener("DOMContentLoaded", loadTasksFromLocalStorage);

function addTask() {
  const text = taskInput.value.trim();
  if (!text) {
    alert("Vui lòng nhập nội dung công việc.");
    return;
  }

  const newTask = {
    id: Date.now(),
    text,
    isDone: false
  };

  tasks.push(newTask);
  saveTasksToLocalStorage();
  renderTasks();
  taskInput.value = "";
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  saveTasksToLocalStorage();
  renderTasks();
}

function toggleDone(id) {
  tasks = tasks.map(task =>
    task.id === id ? { ...task, isDone: !task.isDone } : task
  );
  saveTasksToLocalStorage();
  renderTasks();
}

function renderTasks() {
  taskList.innerHTML = "";

  const filter = filterSelect.value;
  let filteredTasks = tasks;
  if (filter === "active") filteredTasks = tasks.filter(t => !t.isDone);
  else if (filter === "completed") filteredTasks = tasks.filter(t => t.isDone);

  filteredTasks.forEach(task => {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    
    const span = document.createElement("span");
    span.textContent = task.text;
    span.className = task.isDone ? "done" : "";
    span.style.cursor = "pointer";
    span.addEventListener("click", () => toggleDone(task.id));

    const delBtn = document.createElement("button");
    delBtn.textContent = "Xóa";
    delBtn.className = "btn btn-danger btn-sm";
    delBtn.addEventListener("click", () => deleteTask(task.id));

    li.appendChild(span);
    li.appendChild(delBtn);
    taskList.appendChild(li);
  });
}

function saveTasksToLocalStorage() {
  localStorage.setItem("todoTasks", JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
  const stored = localStorage.getItem("todoTasks");
  if (stored) {
    tasks = JSON.parse(stored);
  }
  renderTasks();
}
