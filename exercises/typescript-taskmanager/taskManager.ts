
class TaskManager {
    public tasks: Array<Task> = [];
    onChangeCallback(tasks: Array<Task>): void{};

    create(category: string, title: string, priority: number, estimate: number, spent: number): Task {
        var task = new Task(category, title, priority, estimate, spent);
        this.tasks.push(task);
        this.onChangeCallback && this.onChangeCallback(this.tasks);
        return task;
    }

    find(query: string): Array<Task> {
        query && (query = query.toLowerCase());

        return this._filter(function (t) {
            return t.title.toLowerCase().indexOf(query) > -1 || t.category.toLowerCase().indexOf(query) > -1;
        });
    }

    get(i: number): Task {
        return this.tasks[i];
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
            for (var i = 0; i < this.tasks.length; i++) {
                if (this.tasks[i] == task) {
                    task = i;
                    break;
                }

            }
        }
        if (typeof task === "number" && task >= 0 && task < this.tasks.length) {
            this.tasks.splice(task, 1);
            this.onChangeCallback && this.onChangeCallback(this.tasks);
        }
    }

    editTask(task: Task, property: string, value?: string | number): void {
        
        task[property] = value;

        var taskIndex: number;
        for(var i =0; i < this.tasks.length;i++){
            if(this.tasks[i] === task) taskIndex = i;
        }
        this.tasks[taskIndex] = task;

        this.onChangeCallback && this.onChangeCallback(this.tasks);
    }

    setCompleted(task, n): void {
        if (n >= 0 && n <= task.estimate) {
            task.spent = n;
            task.remaining = task.estimate - task.spent;
            this.onChangeCallback && this.onChangeCallback(this.tasks);
        } 
    }

    onChange(callback: (tasks: Array<Task>) => {void}): void {
        this.onChangeCallback = callback;
    }

    _filter(predicte: Function): Array<Task> {
        var matched: Array<Task> = [];
        this.tasks.forEach(function (task) {
            predicte(task) && matched.push(task);
        });
        return matched;
    }
}