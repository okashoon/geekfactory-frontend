

"use strict";

var form = document.querySelector('form');
var tasksContainer = document.querySelector('#tasks');
var editForm = document.querySelector('#edit-task')

var taskManager = createTaskManager();


form && form.addEventListener('submit', addTask);
taskManager.onChange(update);
loadTasks();

function addTask(event) {
    event.preventDefault();
    var task = {};
    event.target.querySelectorAll('#new-todo input:not([type="submit"]').forEach(function (input) {
        task[input.name] = input.value;
        input.value = null;
    });
    taskManager.create(task.category, task.title, task.priority, task.estimate);
}

function update(tasks) {
    while (tasksContainer.hasChildNodes()) {
        tasksContainer.removeChild(tasksContainer.lastChild);
    }
    tasks.forEach(function (task) {
        tasksContainer.appendChild(createTaskRow(task));
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function createTaskRow(task) {
    var tr = document.createElement('tr');
    tr.appendChild(createTableCell(task.category));
    tr.appendChild(createTableCell(task.title));
    tr.appendChild(createTableCell(task.priority));
    tr.appendChild(createTableCell(task.estimate));
    tr.appendChild(createTableCell(task.spent));
    tr.appendChild(createTableCell(task.remaining));
    tr.appendChild(createTableCell(task.done() ? "\u2713" : "\u2717"));

    var delButton = document.createElement("button");
    delButton.innerHTML = "Delete";
    tr.appendChild(delButton);
    delButton.addEventListener('click', function () { taskManager.remove(task) });

    var editButton = document.createElement("button");
    editButton.innerHTML = "Edit";
    tr.appendChild(editButton);

    editButton.addEventListener('click', allowEdit);
    //creating a temporary task to change and send to task manager
    var tempTask = {}
    tempTask = task;
    function allowEdit(event) {
        var editForm = document.querySelector('#edit-task')
        editForm.setAttribute('style', 'display: block');
        var completed = editForm.elements["completed"];
        completed.setAttribute("max", task.estimate);
        //setting custom message for completed
        completed.addEventListener('invalid', function (e) {
            if (completed.validity.rangeOverflow) {
                e.target.setCustomValidity("How can completed be MORE than estiamted?!");
            } else { e.target.setCustomValidity("") }
        });

        var inputs = editForm.querySelectorAll('input:not([type="submit"])');
        //setting values for the edit form
        for (var i = 0; i < inputs.length; i++) {
            inputs[i].value = task[inputs[i].name];
        }
        editForm.addEventListener('submit', editTask);

        function editTask(e) {
            e.preventDefault();
            //editing category, title, priority and estimate
            for (var i = 0; i < inputs.length; i++) {
                taskManager.editTask(tempTask, inputs[i].name, inputs[i].value);
            }
            var completed = editForm.elements["completed"];
            //editing completed
            taskManager.setCompleted(tempTask, parseInt(completed.value));
            //clearing tempTask, and hiding the editForm
            tempTask = {};
            editForm.setAttribute('style', 'display: none');
        }
    }

    return tr;

}

function createTableCell(value) {
    var td = document.createElement('td');
    var value = document.createTextNode(value);
    td.appendChild(value);
    return td;
}


function loadTasks() {
    if (typeof window.localStorage !== 'undefined') {
        var tasks = JSON.parse(window.localStorage.getItem('tasks'));
        tasks && tasks.forEach(function (task) {
            taskManager.create(task.category, task.title, task.priority, task.estimate, task.spent);
        })
    }
}
