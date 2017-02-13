
var form = document.getElementById("new-todo");
var table = document.getElementById("todo-table");

var taskManager = createTaskManager();

form.addEventListener("submit", function(e){
    e.preventDefault();
    var category = form.elements.namedItem("category").value;
    var title = form.elements.namedItem("title").value;
    var priority = form.elements.namedItem("priority").value;
    var estimate = form.elements.namedItem("estimate").value;

    var task = taskManager.create(category, title, priority, estimate);

    

    var row = document.createElement("tr");

    var categoryCell = document.createElement("td");
    categoryCell.innerHTML = task.category;
    row.appendChild(categoryCell);

    var titleCell = document.createElement("td");
    titleCell.innerHTML = task.title;
    row.appendChild(titleCell);

    var priorityCell = document.createElement("td");
    priorityCell.innerHTML = task.priority;
    row.appendChild(priorityCell);

    var estimateCell = document.createElement("td");
    estimateCell.innerHTML = task.estimate;
    row.appendChild(estimateCell);

    var completedCell = document.createElement("td");
    completedCell.innerHTML = task.spent;
    row.appendChild(completedCell);

    var remainingCell = document.createElement("td");
    remainingCell.innerHTML = task.remaining;
    row.appendChild(remainingCell);

    var doneCell = document.createElement("td");
    if(task.done()) doneCell.innerHTML = "x"
    else doneCell.innerHTML = "";
    row.appendChild(doneCell);

    
    

    
    table.appendChild(row);

    
})