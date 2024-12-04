function saveTasks() {
    const tasks = [];
    document.querySelectorAll('.card').forEach(task => {
        const taskH = task.querySelector('.card-title').textContent;
        const taskTime = task.querySelector('strong').textContent.replace('ساعت: ', '');
        const taskDate = task.querySelector('small').textContent.replace('تاریخ: ', '');
        const taskDetails = task.querySelector('.card-excerpt').textContent.replace('جزییات: ', '');
        const completed = task.classList.contains('completed');
        tasks.push({ taskH, taskTime, taskDate, taskDetails, completed });
    });
    tasks.sort((a, b) => new Date(`${a.taskDate} ${a.taskTime}`) - new Date(`${b.taskDate} ${b.taskTime}`));
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.sort((a, b) => new Date(`${a.taskDate} ${a.taskTime}`) - new Date(`${b.taskDate} ${b.taskTime}`));
    tasks.forEach(task => {
        const taskList = document.getElementById('task-list');
        const listItem = document.createElement('div');
        listItem.className = 'card';
        const taskSummary = document.createElement('div');
        taskSummary.className = 'card-content';
        if (task.completed) {
            listItem.classList.add('completed');
        }

        const taskH = document.createElement('h3');
        taskH.className = 'card-title animated-bg animated-bg-text';
        taskH.textContent = task.taskH;
        taskSummary.appendChild(taskH);

        const detailsDiv = document.createElement('p');
        detailsDiv.className = 'card-excerpt';
        detailsDiv.textContent = task.taskDetails;
        taskSummary.appendChild(detailsDiv);

        const taskAuthor = document.createElement('div');
        taskAuthor.className = 'author';


        const taskAuthorInfo = document.createElement('div');
        taskAuthorInfo.className = 'author-info';

        const taskTimer = document.createElement('strong');
        taskTimer.className = 'animated-bg animated-bg-text';
        taskTimer.textContent = task.taskTime;
        taskAuthorInfo.appendChild(taskTimer);

        const taskDater = document.createElement('small');
        taskDater.className = 'animated-bg animated-bg-text';
        taskDater.textContent = task.taskDate;
        taskAuthorInfo.appendChild(taskDater);

        taskAuthor.appendChild(taskAuthorInfo);

        taskSummary.appendChild(taskAuthor);

        listItem.appendChild(taskSummary);



        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'task-buttons';

        const completeButton = document.createElement('button');
        completeButton.className = 'complete-button';
        completeButton.textContent = 'COMPLETE';
        completeButton.addEventListener('click', function () {
            listItem.classList.toggle('completed');
            saveTasks();
        });
        buttonContainer.appendChild(completeButton);

        const editButton = document.createElement('button');
        editButton.className = 'edit-button';
        editButton.textContent = 'EDIT';
        editButton.addEventListener('click', function () {
            const taskInput = document.getElementById('task-input');
            const taskTimeInput = document.getElementById('task-time');
            const taskDateInput = document.getElementById('task-date');
            const taskDetailsInput = document.getElementById('task-details');
            taskInput.value = task.taskText;
            taskTimeInput.value = task.taskTime;
            taskDateInput.value = task.taskDate;
            taskDetailsInput.value = task.taskDetails;
            listItem.remove();
            saveTasks();
        });
        buttonContainer.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-button';
        deleteButton.textContent = 'DELETE';
        deleteButton.addEventListener('click', function () {
            if (confirm('آیا مطمئن هستید که می‌خواهید این کار را حذف کنید؟')) {
                listItem.remove();
                saveTasks();
            }
        });
        buttonContainer.appendChild(deleteButton);

        listItem.appendChild(buttonContainer);
        taskList.appendChild(listItem);
    });
}

window.addEventListener('load', loadTasks);




document.getElementById('add-task-button').addEventListener('click', function () {
    const taskInput = document.getElementById('task-input');
    const taskText = taskInput.value.trim();

    const taskTimeInput = document.getElementById('task-time');
    const taskTime = taskTimeInput.value.trim();

    const taskDateInput = document.getElementById('task-date');
    const taskDate = taskDateInput.value.trim();

    const taskDetailsInput = document.getElementById('task-details');
    const taskDetails = taskDetailsInput.value.trim();

    if (taskText !== '' && taskTime !== '' && taskDate !== '') {
        const taskList = document.getElementById('task-list');
        const listItem = document.createElement('div');
        listItem.className = 'card';

        const taskSummary = document.createElement('div');
        taskSummary.className = 'card-content';

        const taskH = document.createElement('h3');
        taskH.className = 'card-title animated-bg animated-bg-text';
        taskH.textContent = taskText;
        taskSummary.appendChild(taskH);

        const detailsDiv = document.createElement('p');
        detailsDiv.className = 'card-excerpt';
        detailsDiv.textContent = taskDetails;
        taskSummary.appendChild(detailsDiv);

        const taskAuthor = document.createElement('div');
        taskAuthor.className = 'author';
        

        const taskAuthorInfo = document.createElement('div');
        taskAuthorInfo.className = 'author-info';

        const taskTimer = document.createElement('strong');
        taskTimer.className = 'animated-bg animated-bg-text';
        taskTimer.textContent = taskTime;
        taskAuthorInfo.appendChild(taskTimer);

        const taskDater = document.createElement('small');
        taskDater.className = 'animated-bg animated-bg-text';
        taskDater.textContent = taskDate;
        taskAuthorInfo.appendChild(taskDater);

        taskAuthor.appendChild(taskAuthorInfo);

        taskSummary.appendChild(taskAuthor);

        listItem.appendChild(taskSummary);

        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'task-buttons';

        const completeButton = document.createElement('button');
        completeButton.className = 'complete-button';
        completeButton.textContent = 'COMPLETE';
        completeButton.addEventListener('click', function () {
            listItem.classList.toggle('completed');
            saveTasks();
        });
        buttonContainer.appendChild(completeButton);

        const editButton = document.createElement('button');
        editButton.className = 'edit-button';
        editButton.textContent = 'EDIT';
        editButton.addEventListener('click', function () {
            taskInput.value = taskText;
            taskTimeInput.value = taskTime;
            taskDateInput.value = taskDate;
            taskDetailsInput.value = taskDetails;
            listItem.remove();
            saveTasks();
        });
        buttonContainer.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-button';
        deleteButton.textContent = 'DELETE';
        deleteButton.addEventListener('click', function () {
            if (confirm('آیا مطمئن هستید که می‌خواهید این کار را حذف کنید؟')) {
                listItem.remove();
                saveTasks();
            }
        });
        buttonContainer.appendChild(deleteButton);

        listItem.appendChild(buttonContainer);
        taskList.appendChild(listItem);
        taskInput.value = '';
        taskTimeInput.value = '';
        taskDateInput.value = '';
        taskDetailsInput.value = '';

        saveTasks();
    }
});


//================================================================



const hourEl = document.querySelector('.hour')
const minuteEl = document.querySelector('.minute')
const secondEl = document.querySelector('.second')
const timeEl = document.querySelector('.time')
const dateEl = document.querySelector('.date')
const toggle = document.querySelector('.toggle')

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

toggle.addEventListener('click', (e) => {
    const html = document.querySelector('html')
    if (html.classList.contains('dark')) {
        html.classList.remove('dark')
        e.target.innerHTML = 'Dark mode'
    } else {
        html.classList.add('dark')
        e.target.innerHTML = 'Light mode'
    }
})

function setTime() {
    const time = new Date();
    const month = time.getMonth()
    const day = time.getDay()
    const date = time.getDate()
    const hours = time.getHours()
    const hoursForClock = hours >= 13 ? hours % 12 : hours;
    const minutes = time.getMinutes()
    const seconds = time.getSeconds()
    const ampm = hours >= 12 ? 'PM' : 'AM'

    hourEl.style.transform = `translate(-50%, -100%) rotate(${scale(hoursForClock, 0, 12, 0, 360)}deg)`
    minuteEl.style.transform = `translate(-50%, -100%) rotate(${scale(minutes, 0, 60, 0, 360)}deg)`
    secondEl.style.transform = `translate(-50%, -100%) rotate(${scale(seconds, 0, 60, 0, 360)}deg)`

    timeEl.innerHTML = `${hoursForClock}:${minutes < 10 ? `0${minutes}` : minutes} ${ampm}`
    dateEl.innerHTML = `${days[day]}, ${months[month]} <span class="circle">${date}</span>`
}

// StackOverflow https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers
const scale = (num, in_min, in_max, out_min, out_max) => {
    return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

setTime()

setInterval(setTime, 1000)



//================================================================


const labels = document.querySelectorAll('.form-control label')

labels.forEach(label => {
    label.innerHTML = label.innerText
        .split('')
        .map((letter, idx) => `<span style="transition-delay:${idx * 50}ms">${letter}</span>`)
        .join('')
})


const textarea = document.getElementById('task-details');
const charCount = document.getElementById('charCount');
const maxLength = 90 ;
textarea.addEventListener('input', () => {
    const remaining = maxLength - textarea.value.length;
    charCount.textContent = `${remaining}   Writing Limitation`;

    if (remaining <= 0) { 
        textarea.value = textarea.value.substring(0, maxLength);
        charCount.textContent = `0  Writing Limitation `;
    } 
    else {
        charCount.textContent = `${remaining}   Writing Limitation`;
        }
});


//================================================================

