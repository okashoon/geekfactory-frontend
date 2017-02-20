var TaskManager = (function () {
    function TaskManager() {
        var tasks = new Array;
        this.getTasks = function () {
            return tasks;
        };
        this.pushTask = function (task) {
            tasks.push(task);
        };
    }
    TaskManager.prototype.onChangeCallback = function (tasks) { };
    ;
    TaskManager.prototype.create = function (category, title, priority, estimate, spent) {
        var task = new Task(category, title, priority, estimate, spent);
        this.pushTask(task);
        this.onChangeCallback && this.onChangeCallback(this.getTasks());
        return task;
    };
    TaskManager.prototype.find = function (query) {
        query && (query = query.toLowerCase());
        return this._filter(function (t) {
            return t.title.toLowerCase().indexOf(query) > -1 || t.category.toLowerCase().indexOf(query) > -1;
        });
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
        if (typeof task !== "number") {
            for (var i = 0; i < this.getTasks.length; i++) {
                if (this.getTasks[i] == task) {
                    task = i;
                    break;
                }
            }
        }
        if (typeof task === "number" && task >= 0 && task < this.getTasks.length) {
            this.getTasks().splice(task, 1);
            this.onChangeCallback && this.onChangeCallback(this.getTasks());
        }
    };
    TaskManager.prototype.editTask = function (task, property, value) {
        task[property] = value;
        var taskIndex;
        for (var i = 0; i < this.getTasks().length; i++) {
            if (this.getTasks()[i] === task)
                taskIndex = i;
        }
        this.getTasks()[taskIndex] = task;
        this.onChangeCallback && this.onChangeCallback(this.getTasks());
    };
    TaskManager.prototype.setCompleted = function (task, n) {
        if (n >= 0 && n <= task.estimate) {
            task.spent = n;
            task.remaining = task.estimate - task.spent;
            this.onChangeCallback && this.onChangeCallback(this.getTasks());
        }
    };
    TaskManager.prototype.onChange = function (callback) {
        this.onChangeCallback = callback;
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
function createTaskManager() {
}
