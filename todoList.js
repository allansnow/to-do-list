const button = document.querySelector('.todo-button');
const userInput = document.querySelector('.todo-input');
const todoUl = document.querySelector('.todo-ul');
const filter = document.querySelector('.filter-tasks')

document.addEventListener('DOMContentLoaded', getTasks)

button.addEventListener('click', (event) => {

// preventing default
event.preventDefault();

// creating taskDiv
const taskDiv = document.createElement('div');
taskDiv.classList.add('todo-item');
todoUl.appendChild(taskDiv);

// creating taskLi
const taskLi = document.createElement('li');
taskLi.classList.add('task-li');
taskLi.innerHTML = userInput.value;
taskDiv.appendChild(taskLi);

// creating taskcheckButton
const checkButton = document.createElement('button');
checkButton.innerHTML = '<i class="fas fa-check"></i>';
checkButton.classList.add('check-btn');
taskDiv.appendChild(checkButton);

// creating taskdeleteButton 
const deleteButton = document.createElement('button');
deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
deleteButton.classList.add('delete-btn');
taskDiv.appendChild(deleteButton);

// saving tasks on local storage
saveLocalTasks(userInput.value);
userInput.value= '';
});


// adding event listeners to checkButton and deleteButton
todoUl.addEventListener('click', (e) => {
const item = e.target;

// deleteButton

if (item.className === 'delete-btn') {
const taskItem = item.parentElement;
taskItem.classList.add('fall');
removeStorageTask(taskItem);
taskItem.addEventListener('transitionend', () => {
taskItem.remove();
})
}

// checkButton

else if (item.className === 'check-btn') {
const taskItem = item.parentElement;
taskItem.classList.toggle('completed');
}
});

// creating filter

filter.addEventListener('change', (e) => {
const tasks = todoUl.childNodes;
tasks.forEach(function(task){
switch (e.target.value) {
case 'all': task.style.display = 'flex';
break;
case 'completed':
if (task.classList.contains('completed')) {
task.style.display = 'flex';
}
else {
task.style.display = 'none';
}
break;
case 'uncompleted': 
if (!task.classList.contains('completed')) {
task.style.display = 'flex'
}
else {
task.style.display = 'none';
}
break;
}
}); 
});

// function for saving local storage tasks

function saveLocalTasks(task) {
    //Check---Hey Do I already have thing in there?
    let tasks;
    if(localStorage.getItem('tasks') === null){
      tasks = [];
    }
    else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

// function for getting back the tasks 

function getTasks() {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }
  else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

tasks.forEach(function(task){
// creating taskDiv
const taskDiv = document.createElement('div');
taskDiv.classList.add('todo-item');
todoUl.appendChild(taskDiv);

// creating taskLi
const taskLi = document.createElement('li');
taskLi.classList.add('task-li');
taskLi.innerHTML = task;
taskDiv.appendChild(taskLi);

// creating taskcheckButton
const checkButton = document.createElement('button');
checkButton.innerHTML = '<i class="fas fa-check"></i>';
checkButton.classList.add('check-btn');
taskDiv.appendChild(checkButton);


// creating taskdeleteButton 
const deleteButton = document.createElement('button');
deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
deleteButton.classList.add('delete-btn');
taskDiv.appendChild(deleteButton);
})
}

function removeStorageTask(task) {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }
  else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
const taskIndex = (task.children[0].innerText);
tasks.splice(tasks.indexOf(taskIndex), 1);
localStorage.setItem('tasks', JSON.stringify(tasks))
}