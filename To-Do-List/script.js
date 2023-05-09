const form = document.querySelector('form');
const input = document.querySelector('input[type="text"]');
const select = document.querySelector('select');
const taskList = document.querySelector('.tasks');
const filterButtons = document.querySelectorAll('.filter button');

// Event listeners
form.addEventListener('submit', addTask);
taskList.addEventListener('click', removeTask);
filterButtons.forEach(button => button.addEventListener('click', filterTasks));

// Functions
function addTask(event) {
  event.preventDefault();
  const task = input.value.trim();
  const priority = select.value;
  if (task !== '') {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${task}</span>
      <span class="priority ${priority}">${priority.toUpperCase()}</span>
      <span class="actions">
        <button>Done</button>
        <button>Delete</button>
      </span>
    `;
    taskList.appendChild(li);
    saveTasks();
    input.value = '';
  }
}

function removeTask(event) {
    if (event.target.tagName === 'BUTTON') {
      const li = event.target.parentNode.parentNode;
      if (event.target.textContent === 'Done') {
        li.classList.toggle('done');
      } else {
        li.classList.add('done'); // add done class
        li.remove();
      }
      saveTasks();
    }
  }
  

function filterTasks(event) {
  const filter = event.target.dataset.filter;
  filterButtons.forEach(button => button.classList.remove('active'));
  event.target.classList.add('active');
  taskList.querySelectorAll('li').forEach(li => {
    if (filter === 'all' || li.querySelector('.priority').classList.contains(filter)) {
      li.style.display = '';
    } else {
      li.style.display = 'none';
    }
  });
}

function saveTasks() {
  const tasks = [];
  taskList.querySelectorAll('li').forEach(li => {
    const task = {
      text: li.querySelector('span:first-child').textContent,
      priority: li.querySelector('.priority').classList[1],
      done: li.classList.contains('done')
    };
    tasks.push(task);
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks'));
  if (tasks) {
    tasks.forEach(task => {
      const li = document.createElement('li');
      li.innerHTML = `
        <span>${task.text}</span>
        <span class="priority ${task.priority}">${task.priority.toUpperCase()}</span>
        <span class="actions">
          <button>Done</button>
          <button>Delete</button>
        </span>
      `;
      if (task.done) {
        li.classList.add('done');
    }
    taskList.appendChild(li);
    });
    }
    }
    
    loadTasks();
