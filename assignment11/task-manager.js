Task = require('./task');

//proto object that manager will point to - has all the functions (to reserve memory)
var proto = {};
//create is a non constructive function that creates a manager object
var create = function () {
    //create manager and its prototype will be proto
    var manager = Object.create(proto);
    //array to hold tasks initiated by manager
    manager.tasks = [];
    //array that contains only active tasks
    manager.activeTasks = [];

    return manager;
}

proto.getAll = function (activeOnly) {
    //if activeOnly is false or not present return all tasks
    if (!activeOnly) return this.tasks;

    //if activeOnly is true return only active tasks
    else return this.activeTasks;

}

proto.get = function (n) {
    return this.tasks[n];
}


proto.find = function (string) {
    var result = [];
    //iterate through tasks array 
    for (var i = 0; i < this.tasks.length; i++) {
        //if string argument matches category or title (or part of it, non case-sensitive) add the task to results array
        if (this.tasks[i].category.toLowerCase().includes(string.toLowerCase()) ||
            this.tasks[i].title.toLowerCase().includes(string.toLowerCase())) result.push(this.tasks[i]);
    }
    return result;
}

proto.remove = function (n) {
    //if n is a task(object) get its index and assign it to its index
    if (typeof n === 'object') n = this.tasks.indexOf(n);
    //delete task from array
    this.tasks.splice(n, 1);
}

//create is a non-constructive function that returns a task object
proto.create = function (category, title, priority, estimate) {
    var task = new Task(category, title, priority, estimate);
    //if estimate == 0 then task is finished and not active, else it is active
    if (task.estimate !== 0) this.activeTasks.push(task);
    this.tasks.push(task);
    return task;
}




exports.create = create;