const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');


// Load tasks from local storage when the page loads
document.addEventListener('DOMContentLoaded', function() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(function(task) {
        addTaskToDOM(task);
    });
});

taskForm.addEventListener('submit',addTask);

function addTask(event){
    event.preventDefault(); // prevent form submission

    const taskText = taskInput.value.trim();

    if(taskText!==""){
        const task = { text: taskText, completed: false };
        addTaskToDOM(task);
        saveTaskToLocalStorage(task);
        taskInput.value = '';

    }
    else{
        alert('Please enter a task');
    }
}

function addTaskToDOM(task) {
    const taskItem = document.createElement('li');
    taskItem.innerHTML = `
        <span class="task-text ${task.completed ? 'completed' : ''}">${task.text}</span>
        <button class="complete-btn" ${task.completed ? 'style="display: none;"' : ''}>✅</button>
        <button class="delete-btn">⛔</button>
    `;
    taskList.appendChild(taskItem);

}

function saveTaskToLocalStorage(task) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

taskList.addEventListener('click', function(event) {
    const taskItem=event.target.parentElement;
    const taskText=taskItem.querySelector('span.task-text');

    if (event.target.classList.contains('delete-btn')) {
        // Remove the parent <li> element when delete button is clicked
       taskItem.remove();
       removeTaskFromLocalStorage(taskText.textContent);

    }
    if(event.target.classList.contains('complete-btn')){
        // taskItem.style.backgroundColor='#00ff3738';
        // taskItem.classList.toggle('completed');
        taskText.classList.toggle('completed');
        // event.target.style.display='none';
        updateTaskCompletionInLocalStorage(taskText.textContent, true);
        
    }
});

