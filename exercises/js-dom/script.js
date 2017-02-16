
// var form = document.getElementById("new-todo");
// var table = document.getElementById("todo-table");

// var taskManager = createTaskManager();

// form.addEventListener("submit", function (e) {
//     e.preventDefault();
//     var category = form.elements.namedItem("category").value;
//     var title = form.elements.namedItem("title").value;
//     var priority = form.elements.namedItem("priority").value;
//     var estimate = form.elements.namedItem("estimate").value;



//     taskManager.onChange(update);


//     function update() {
//          var task = taskManager.create(category, title, priority, estimate);
//         var row = document.createElement("tr");

//         var categoryCell = document.createElement("td");
//         categoryCell.innerHTML = task.category;
//         row.appendChild(categoryCell);

//         var titleCell = document.createElement("td");
//         titleCell.innerHTML = task.title;
//         row.appendChild(titleCell);

//         var priorityCell = document.createElement("td");
//         priorityCell.innerHTML = task.priority;
//         row.appendChild(priorityCell);

//         var estimateCell = document.createElement("td");
//         estimateCell.innerHTML = task.estimate;
//         row.appendChild(estimateCell);

//         var completedCell = document.createElement("td");
//         completedCell.innerHTML = task.spent;
//         row.appendChild(completedCell);

//         var remainingCell = document.createElement("td");
//         remainingCell.innerHTML = task.remaining;
//         row.appendChild(remainingCell);

//         var doneCell = document.createElement("td");
//         if (task.done()) doneCell.innerHTML = "x"
//         else doneCell.innerHTML = "";
//         row.appendChild(doneCell);

//         table.appendChild(row);
//     }

// })




"use strict";

var form = document.querySelector('form');
var tasksContainer = document.querySelector('#tasks');
var editTasksContainer = document.querySelector('#edit-tasks')

var taskManager = createTaskManager();

form && form.addEventListener('submit', addTask);
taskManager.onChange(update);

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
       //editTasksContainer.removeChild(editTasksContainer.lastChild);
    }

    tasks.forEach(function (task) {
        tasksContainer.appendChild(createTaskRow(task));
        //task that will be inserted into the editing table
        var editableTask = task;
        //loop through editableTask and convert the string properties to input elements with values and names of those properties
        for (var key in editableTask) {
            var input = document.createElement("input");
            input.type = "text";
            input.name = key;
            input.value = editableTask[key];
            editableTask[key] = input;
        }
        editTasksContainer.appendChild(createTaskRow(editableTask, "edit"));
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//edit is a second argument that tells if that row belongs to the main table or edit table
function createTaskRow(task, edit) {
    var tr = document.createElement('tr');
    tr.appendChild(createTableCell(task.category));
    tr.appendChild(createTableCell(task.title));
    tr.appendChild(createTableCell(task.priority));
    tr.appendChild(createTableCell(task.estimate));
    if (edit != "edit") {
        tr.appendChild(createTableCell(task.spent));
        tr.appendChild(createTableCell(task.remaining));
        tr.appendChild(createTableCell(task.done() && '&#10004;'));
        var delButton = document.createElement("button");
        delButton.innerHTML = "Delete";
        tr.appendChild(delButton);
        delButton.addEventListener('click', function () { taskManager.remove(task) });

        var editButton = document.createElement("button");
        editButton.innerHTML = "Edit";
        tr.appendChild(editButton);
        editButton.addEventListener('click', function(){
            
        });
    }
    return tr;
}

function createTableCell(property) {
    var td = document.createElement('td');
    //if the property passed is an element node(in case we are passing editableTask property)
    if(property.nodeType === 1){
        property.setAttribute('readOnly',true);
        td.appendChild(property);
    } else {
        var property = document.createTextNode(property);
        td.appendChild(property);
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
