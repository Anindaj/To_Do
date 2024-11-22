function saveTasks() {
    const tasks = [];
    document.querySelectorAll('.task-container').forEach(task => {
        const taskSummary = task.querySelector('.task-summary').textContent;
        const taskTime = task.querySelector('.task-time').textContent.replace('ساعت: ', '');
        const taskDate = task.querySelector('.task-date').textContent.replace('تاریخ: ', '');
        const taskDetails = task.querySelector('.task-details').textContent.replace('جزییات: ', '');
        const completed = task.classList.contains('completed');
        tasks.push({ taskSummary, taskTime, taskDate, taskDetails, completed });
    });
    tasks.sort((a, b) => new Date(`${a.taskDate} ${a.taskTime}`) - new Date(`${b.taskDate} ${b.taskTime}`)); 
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.sort((a, b) => new Date(`${a.taskDate} ${a.taskTime}`) - new Date(`${b.taskDate} ${b.taskTime}`)); 
    tasks.forEach(task => {
        const taskList = document.getElementById('task-list');
        const listItem = document.createElement('li');
        listItem.className = 'task-container';
        if (task.completed) {
            listItem.classList.add('completed'); 
        }

        const taskSummary = document.createElement('div');
        taskSummary.className = 'task-summary';
        taskSummary.textContent = task.taskSummary;

        listItem.appendChild(taskSummary);

        const detailsDiv = document.createElement('div');
        detailsDiv.className = 'details-div';
        detailsDiv.innerHTML = `
            <div class="task-time-date">
                <p class="task-time">ساعت: ${task.taskTime}</p>
                <p class="task-date">تاریخ: ${task.taskDate}</p>
            </div>
            <p class="task-details">جزییات: ${task.taskDetails}</p>
        `;
        listItem.appendChild(detailsDiv);

        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'task-buttons';

        const completeButton = document.createElement('button');
        completeButton.className = 'complete-button';
        completeButton.textContent = 'اتمام';
        completeButton.addEventListener('click', function () {
            listItem.classList.toggle('completed');
            saveTasks();
        });
        buttonContainer.appendChild(completeButton);

        const editButton = document.createElement('button');
        editButton.className = 'edit-button';
        editButton.textContent = 'ویرایش';
        editButton.addEventListener('click', function () {
            const taskInput = document.getElementById('task-input');
            const taskTimeInput = document.getElementById('task-time');
            const taskDateInput = document.getElementById('task-date');
            const taskDetailsInput = document.getElementById('task-details');
            taskInput.value = task.taskSummary;
            taskTimeInput.value = task.taskTime;
            taskDateInput.value = task.taskDate;
            taskDetailsInput.value = task.taskDetails;
            listItem.remove();
            saveTasks();
        });
        buttonContainer.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-button';
        deleteButton.textContent = 'حذف';
        deleteButton.addEventListener('click', function () {
            if (confirm('آیا مطمئن هستید که می‌خواهید این کار را حذف کنید؟')) {
                listItem.remove();
                saveTasks();
            }
        });
        buttonContainer.appendChild(deleteButton);

        const detailsButton = document.createElement('button');
        detailsButton.className = 'details-button';
        detailsButton.textContent = 'نمایش جزییات';
        detailsButton.addEventListener('click', function () {
            detailsDiv.style.display = detailsDiv.style.display === 'none' ? 'block' : 'none';
        });
        buttonContainer.appendChild(detailsButton);

        listItem.appendChild(buttonContainer);
        taskList.appendChild(listItem);
    });
}

// بارگذاری کارها پس از بارگذاری صفحه
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
        const listItem = document.createElement('li');
        listItem.className = 'task-container';

        const taskSummary = document.createElement('div');
        taskSummary.className = 'task-summary';
        taskSummary.textContent = taskText;

        listItem.appendChild(taskSummary);

        const detailsDiv = document.createElement('div');
        detailsDiv.className = 'details-div';
        detailsDiv.innerHTML = `
            <div class="task-time-date">
                <p class="task-time">ساعت: ${taskTime}</p>
                <p class="task-date">تاریخ: ${taskDate}</p>
            </div>
            <p class="task-details">جزییات: ${taskDetails}</p>
        `;
        listItem.appendChild(detailsDiv);

        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'task-buttons';

        const completeButton = document.createElement('button');
        completeButton.className = 'complete-button';
        completeButton.textContent = 'اتمام';
        completeButton.addEventListener('click', function () {
            listItem.classList.toggle('completed');
            saveTasks();
        });
        buttonContainer.appendChild(completeButton);

        const editButton = document.createElement('button');
        editButton.className = 'edit-button';
        editButton.textContent = 'ویرایش';
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
        deleteButton.textContent = 'حذف';
        deleteButton.addEventListener('click', function () {
            if (confirm('آیا مطمئن هستید که می‌خواهید این کار را حذف کنید؟')) {
                listItem.remove();
                saveTasks(); 
            }
        });
        buttonContainer.appendChild(deleteButton);

        const detailsButton = document.createElement('button');
        detailsButton.className = 'details-button';
        detailsButton.textContent = 'نمایش جزییات';
        detailsButton.addEventListener('click', function () {
            detailsDiv.style.display = detailsDiv.style.display === 'none' ? 'block' : 'none';
        });
        buttonContainer.appendChild(detailsButton);

        listItem.appendChild(buttonContainer);
        taskList.appendChild(listItem);
        taskInput.value = '';
        taskTimeInput.value = '';
        taskDateInput.value = '';
        taskDetailsInput.value = '';

        saveTasks(); 
    }
});
