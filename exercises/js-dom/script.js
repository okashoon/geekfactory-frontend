

"use strict";

var form = document.querySelector('form');
var tasksContainer = document.querySelector('#tasks');
var editTasksContainer = document.querySelector('#edit-tasks')

var taskManager = createTaskManager();


form && form.addEventListener('submit', addTask);
taskManager.onChange(update);
loadTasks();

function addTask(event) {
    event.preventDefault();
    var task = {};
    event.target.querySelectorAll('input:not([type="submit"]').forEach(function (input) {
        task[input.name] = input.value;
        input.value = null;
    });
    taskManager.create(task.category, task.title, task.priority, task.estimate);
}

function update(tasks) {
    while (tasksContainer.hasChildNodes()) {
        tasksContainer.removeChild(tasksContainer.lastChild);
        //delete also the editTask row
        editTasksContainer.removeChild(editTasksContainer.lastChild);
    }
    tasks.forEach(function (task) {
        tasksContainer.appendChild(createTaskRow(task));
        editTasksContainer.appendChild(createTaskRow(task, "edit"));
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//edit is a second argument that tells if that row belongs to the main table or edit table
function createTaskRow(task, edit) {
    var tr = document.createElement('tr');
    tr.appendChild(createTableCell(task.category, edit, "category"));
    tr.appendChild(createTableCell(task.title, edit, "title"));
    tr.appendChild(createTableCell(task.priority, edit, "priority"));
    tr.appendChild(createTableCell(task.estimate, edit, "estimate"));
    // elements that will only be appended to the editTasksContainer
    if (edit === "edit") {
        var applyButton = document.createElement('button');
        applyButton.innerHTML = " Apply changes";
        applyButton.addEventListener('click', editTask);
        applyButton.disabled = true;
        tr.appendChild(applyButton);


        function editTask(event) {
            //get rowIndex to apply the edits to the proper task
            var rowIndex = event.target.parentNode.rowIndex - 1;
            var table = document.getElementById("edit-tasks");
            var inputs = table.rows[rowIndex].getElementsByTagName("input");
            // loop through every input value and apply it to the task
            for (var i = 0; i < inputs.length; i++) {
                taskManager.editTask(task, inputs[i].name, inputs[i].value);
            }

        }

    }
    //elements that will be appended to the main table
    if (edit != "edit") {
        tr.appendChild(createTableCell(task.spent, edit));
        tr.appendChild(createTableCell(task.remaining, edit));
        tr.appendChild(createTableCell(task.done() && '&#10004;', edit));
        //delete button
        var delButton = document.createElement("button");
        delButton.innerHTML = "Delete";
        tr.appendChild(delButton);
        delButton.addEventListener('click', function () { taskManager.remove(task) });

        //button to allow editing that row
        var editButton = document.createElement("button");
        editButton.innerHTML = "Edit";
        tr.appendChild(editButton);

        editButton.addEventListener('click', allowEdit);


        function allowEdit(event) {
            //get row index, to allow editing only that row
            var rowIndex = event.target.parentNode.rowIndex - 1;
            var table = document.getElementById("edit-tasks");
            //select input and button elements in that row
            var inputs = table.rows[rowIndex].querySelectorAll("input, button")
            for (var i = 0; i < inputs.length; i++) {
                // for input elements remove attribute
                inputs[i].nodeName === "INPUT" && inputs[i].removeAttribute('readOnly');
                // for button elements remove disabled
                inputs[i].nodeName === "BUTTON" && (inputs[i].disabled = false);

            }
        }


    }
    return tr;
}

function createTableCell(value, edit, property) {
    var td = document.createElement('td');
    // in editTable create input element rather than text node, and set its value, and set it to readOnly
    if (edit === "edit") {
        var input = document.createElement('input');
        input.value = value;
        input.name = property;
        input.setAttribute('readOnly', true);
        td.appendChild(input);

    } else {
        var value = document.createTextNode(value);
        td.appendChild(value);
    }

    return td;
}


function loadTasks() {
    if (typeof window.localStorage !== 'undefined') {
        var tasks = JSON.parse(window.localStorage.getItem('tasks'));
        tasks && tasks.forEach(function (task) {
            taskManager.create(task.category, task.title, task.priority, task.estimate);
        })
    }
}
