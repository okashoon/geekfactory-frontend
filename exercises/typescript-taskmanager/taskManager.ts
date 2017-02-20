
class TaskManager {
    //putting tasks inside the constructor function to be private, and making getters and setters for it
    pushTask: (task: Task) => void;
    getTasks: () => Array<Task>;
    constructor() {
        var tasks: Array<Task> = new Array;
        this.getTasks = function () {
            return tasks;
        }
        this.pushTask = function (task) {
            tasks.push(task);
        
        }

    }



    onChangeCallback(tasks: Array<Task>): void { };

    create(category: string, title: string, priority: number, estimate: number, spent: number): Task {
        var task = new Task(category, title, priority, estimate, spent);
        this.pushTask(task);
        this.onChangeCallback && this.onChangeCallback(this.getTasks());
        return task;
    }

    find(query: string): Array<Task> {
        query && (query = query.toLowerCase());

        return this._filter(function (t) {
            return t.title.toLowerCase().indexOf(query) > -1 || t.category.toLowerCase().indexOf(query) > -1;
        });
    }

    get(i: number): Task {
        return this.getTasks()[i];
    }

    getAll(activeOnly: boolean): Array<Task> {
        return this._filter(
            function (t) {
                return !activeOnly || t.done();
            }
        );
    }

    remove(task?: number | Task) {
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
    }

    editTask(task: Task, property: string, value?: string | number): void {

        task[property] = value;

        var taskIndex: number;
        for (var i = 0; i < this.getTasks().length; i++) {
            if (this.getTasks()[i] === task) taskIndex = i;
        }
        this.getTasks()[taskIndex] = task;

        this.onChangeCallback && this.onChangeCallback(this.getTasks());
    }

    setCompleted(task, n): void {
        if (n >= 0 && n <= task.estimate) {
            task.spent = n;
            task.remaining = task.estimate - task.spent;
            this.onChangeCallback && this.onChangeCallback(this.getTasks());
        }
    }

    onChange(callback: (tasks: Array<Task>) => void): void {
        this.onChangeCallback = callback;
    }

    _filter(predicte: Function): Array<Task> {
        var matched: Array<Task> = [];
        this.getTasks().forEach(function (task) {
            predicte(task) && matched.push(task);
        });
        return matched;
    }
}

function createTaskManager() {

}