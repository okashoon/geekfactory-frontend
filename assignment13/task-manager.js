"use strict";
var task_1 = require("./task");
exports.create = function () {
    var tasks = new Array();
    var taskManager = new TaskManager();
    taskManager.getTasks = function () {
        return tasks;
    };
    taskManager.pushTask = function (task) {
        tasks.push(task);
    };
    return taskManager;
};
var TaskManager = (function () {
    function TaskManager() {
    }
    TaskManager.prototype.create = function (category, title, priority, estimate) {
        var task = new task_1.Task(category, title, priority, estimate);
        this.pushTask(task);
        return task;
    };
    TaskManager.prototype.get = function (i) {
        return this.getTasks()[i];
    };
    TaskManager.prototype.getAll = function (activeOnly) {
        return this._filter(function (t) {
            return !activeOnly || t.done();
        });
    };
    TaskManager.prototype.remove = function (task) {
        if (typeof task != "number") {
            console.log("inside task!=number");
            for (var i = 0; i < this.getTasks().length; i++) {
                if (this.getTasks()[i] == task) {
                    task = i;
                    console.log(task);
                    break;
                }
            }
        }
        if (typeof task == "number" && task >= 0 && task < this.getTasks().length) {
            this.getTasks().splice(task, 1);
            console.log(task);
        }
    };
    TaskManager.prototype.find = function (query) {
        query && (query = query.toLowerCase());
        return this._filter(function (t) {
            return t.title.toLowerCase().indexOf(query) > -1 || t.category.toLowerCase().indexOf(query) > -1;
        });
    };
    TaskManager.prototype._filter = function (predicte) {
        var matched = [];
        this.getTasks().forEach(function (task) {
            predicte(task) && matched.push(task);
        });
        return matched;
    };
    return TaskManager;
}());
