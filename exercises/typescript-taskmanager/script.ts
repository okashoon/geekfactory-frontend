

"use strict";

var form = document.querySelector('form');
var tasksContainer = document.querySelector('#tasks');
var editForm = document.querySelector('#edit-task')

var taskManager = new TaskManager();


form && form.addEventListener('submit', addTask);
taskManager.onChange(update);
loadTasks();

function addTask(event): void {
    event.preventDefault();
    var task: any = {};
    event.target.querySelectorAll('#new-todo input:not([type="submit"]').forEach(function (input) {
        task[input.name] = input.value;
        input.value = null;
    });
    taskManager.create(task.category, task.title, task.priority, task.estimate, task.spent);
}

function update(tasks: Array<Task>): void {
    while (tasksContainer.hasChildNodes()) {
        tasksContainer.removeChild(tasksContainer.lastChild);
    }
    tasks.forEach(function (task) {
        tasksContainer.appendChild(createTaskRow(task));
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function createTaskRow(task: Task): HTMLElement {
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
    //tempTask is a real task to be able to put it in the editTask function
    var tempTask = new Task("","",0,0,0);
    tempTask = task;
    
    function allowEdit(event) {
        //has to cast to form element to be able to use .elements on it
        var editForm = <HTMLFormElement>document.querySelector('#edit-task')
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
            //casting element into InputElement
            let input = <HTMLInputElement>inputs[i];
            input.value = task[input.name];
        }
        editForm.addEventListener('submit', editTask);

        function editTask(e) {
            e.preventDefault();
            //editing category, title, priority and estimate
            for (var i = 0; i < inputs.length; i++) {
                let input = <HTMLInputElement>inputs[i];
                taskManager.editTask(tempTask, input.name, input.value);
            }
            var completed = editForm.elements["completed"];
            //editing completed
            taskManager.setCompleted(tempTask, parseInt(completed.value));
            //clearing tempTask, and hiding the editForm
            tempTask = new Task("","",0,0,0);
            editForm.setAttribute('style', 'display: none');
        }
    }

    return tr;

}

function createTableCell(value?: string | number) {
    var td = document.createElement('td');
    var text = document.createTextNode(value.toString());
    td.appendChild(text);
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
