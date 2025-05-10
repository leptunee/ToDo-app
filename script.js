let taskList = [];

function addTask() {
  const input = document.getElementById('taskInput');
  const task = input.value.trim();
  if (task) {
    taskList.push({ text: task, done: false });
    input.value = '';
    saveAndRender();
  }
}

function toggleTask(index) {
  taskList[index].done = !taskList[index].done;
  saveAndRender();
}

function deleteTask(index) {
  taskList.splice(index, 1);
  saveAndRender();
}

function saveAndRender() {
  localStorage.setItem('tasks', JSON.stringify(taskList));
  renderTasks();
}

function renderTasks() {
  const list = document.getElementById('taskList');
  list.innerHTML = '';
  taskList.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = `flex justify-between items-center p-2 rounded ${task.done ? 'line-through text-gray-400 bg-gray-100' : 'bg-gray-200'}`;
    li.innerHTML = `
      <span onclick="toggleTask(${index})">${task.text}</span>
      <button onclick="deleteTask(${index})">X</button>
    `;
    list.appendChild(li);
  });
}

function loadTasks() {
  const saved = localStorage.getItem('tasks');
  taskList = saved ? JSON.parse(saved) : [];
  renderTasks();
}

loadTasks();
