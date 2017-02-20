var Task = (function () {
    function Task(category, title, priority, estimate, spent, remaining) {
        this.category = category;
        this.title = title;
        this.priority = priority;
        this.estimate = estimate;
        this.spent = spent;
        this.remaining = remaining;
        this.spent = spent || 0;
        this.remaining = this.remaining || this.estimate - this.spent;
    }
    Task.prototype.track = function (hours) {
        this.spent += hours;
        this.remaining = this.estimate - this.spent;
    };
    Task.prototype.done = function () {
        return this.remaining === 0;
    };
    Task.prototype.complete = function () {
        this.remaining = 0;
    };
    return Task;
}());
