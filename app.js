flatpickr("#calendar", { inline: true });


const loginBtn   = document.querySelector("#log");
const loginForm  = document.querySelector(".login");
const closeLogin = document.getElementById("closeLogin");
const main       = document.querySelector(".main-container");

loginBtn.addEventListener("click", () => {
  loginForm.classList.add("active");
  main.classList.add("act");
});
closeLogin.addEventListener("click", () => {
  loginForm.classList.remove("active");
  main.classList.remove("act");
});


const addTaskBtn  = document.querySelector(".add-task a");
const taskForm    = document.querySelector(".take-input");
const closeInput  = document.querySelector("#close");

addTaskBtn.addEventListener("click", e => {
  e.preventDefault();
  taskForm.classList.add("act");
});
closeInput.addEventListener("click", () => {
  taskForm.classList.remove("act");
});


const taskInput     = document.getElementById("taskInput");
const priorityInput = document.getElementById("priorityInput");
const submitBtn     = document.getElementById("submit1");
const taskListEl    = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

submitBtn.addEventListener("click", e => {
  e.preventDefault();

  const text = taskInput.value.trim();
  const prio = priorityInput.value;
  if (!text) return;


  tasks.push({ text, priority: prio, id: Date.now() });
  saveTasks();
  renderTasks();


  taskInput.value = "";
  priorityInput.value = "Higher";
  taskForm.classList.remove("act");
});

function renderTasks() {
  taskListEl.innerHTML = "";
  tasks.forEach(t => {
    const li = document.createElement("li");
    li.className = "task-item";
    li.innerHTML = `
      <span>
        <strong>${t.text}</strong> — <em>${t.priority}</em>
      </span>
      <span>
        <button onclick="startEdit(${t.id})">
          <i class="fa-solid fa-pen-to-square"></i>
        </button>
        <button onclick="deleteTask(${t.id})">
          <i class="fa-solid fa-trash"></i>
        </button>
      </span>
    `;
    taskListEl.appendChild(li);
  });
}

window.deleteTask = function(id) {
  tasks = tasks.filter(t => t.id !== id);
  saveTasks();
  renderTasks();
};

window.startEdit = function(id) {
  const task = tasks.find(t => t.id === id);
  if (!task) return;

  taskInput.value = task.text;
  priorityInput.value = task.priority;

  tasks = tasks.filter(t => t.id !== id);
  saveTasks();
  renderTasks();

  taskForm.classList.add("act");
};

renderTasks();
