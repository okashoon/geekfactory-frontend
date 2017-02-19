var Task = function (category, title, priority, estimate, spent) {
    this.category = category;
    this.title = title;
    this.priority = priority;
    this.estimate = estimate;
    this.spent = spent;
    this.remaining = estimate -spent;
    this.editable = false;
}

Task.prototype.track = function (n) {
    if (n > 0) {
        this.spent += n;
        this.remaining = this.estimate - this.spent;
    }
}
Task.prototype.done = function () {
    if (this.remaining === 0) return true;
    return false;
}

Task.prototype.complete = function () {
    this.remaining = 0;
}


