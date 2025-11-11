let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";
    li.innerHTML = `
      <span>${task.name}</span>
      <div>
        <button class="edit" onclick="editTask(${index})">✏️</button>
        <button class="delete" onclick="deleteTask(${index})">🗑️</button>
        <button onclick="toggleComplete(${index})">✅</button>
      </div>
    `;
    taskList.appendChild(li);
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  const name = taskInput.value.trim();
  if (name !== "") {
    tasks.push({ name, completed: false });
    taskInput.value = "";
    renderTasks();
  }
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

function editTask(index) {
  const newName = prompt("Edit task:", tasks[index].name);
  if (newName !== null && newName.trim() !== "") {
    tasks[index].name = newName.trim();
    renderTasks();
  }
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

addBtn.addEventListener("click", addTask);
renderTasks();
