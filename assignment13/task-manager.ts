import { Task } from "./task";


export var create = function () {
    var tasks: Array<Task> = new Array<Task>();
    var taskManager = new TaskManager();
    taskManager.getTasks = function (): Array<Task> {
        return tasks;
    }
    taskManager.pushTask = function (task: Task) {
        tasks.push(task);
    }

    return taskManager;
}


class TaskManager {
    public getTasks;
    public pushTask;

    create(category: string, title: string, priority: number, estimate: number) {
        var task = new Task(category, title, priority, estimate);
        this.pushTask(task);
        return task;
    }

    get(i: number): Task {
        return this.getTasks()[i];
    }

    getAll(activeOnly?: boolean): Array<Task> {
        return this._filter(
            function (t) {
                return !activeOnly || t.done();
            }
        );
    }

    remove(task?: number | Task) {
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
    }

    find(query: string): Array<Task> {
        query && (query = query.toLowerCase());

        return this._filter(function (t) {
            return t.title.toLowerCase().indexOf(query) > -1 || t.category.toLowerCase().indexOf(query) > -1;
        });
    }





    _filter(predicte: Function): Array<Task> {
        var matched: Array<Task> = [];
        this.getTasks().forEach(function (task) {
            predicte(task) && matched.push(task);
        });
        return matched;
    }


}