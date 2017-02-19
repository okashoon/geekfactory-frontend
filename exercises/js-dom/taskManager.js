
var createTaskManager = function () {
    var tasks = [];
    var onChangeCallback;

    function create(category, title, priority, estimate, spent) {
        var task = new Task(category, title, priority, estimate, spent);
        tasks.push(task);
        onChangeCallback && onChangeCallback(tasks);
        return task;
    };

    function find(query) {
        query && query.toLowerCase && (query = query.toLowerCase());

        return _filter(function (t) {
            return t.title.toLowerCase().indexOf(query) > -1 || t.category.toLowerCase().indexOf(query) > -1;
        });
    }

    function get(i) {
        return tasks[i];
    }

    function getAll(activeOnly) {
        return _filter(function (task) {
            return !activeOnly || !task.done();
        });
    }

    function remove(index) {
        if (typeof index !== 'number') {
            for (var i = 0; i < tasks.length; i++) {
                if (tasks[i] === index) {
                    index = i;
                    break;
                }
            }
        }

        if (index >= 0 && index < tasks.length) {
            tasks.splice(index, 1);
            onChangeCallback && onChangeCallback(tasks);
        }
    }

    function editTask(task, property, value) {
        
        task[property] = value;

        var taskIndex;
        for(var i =0; i < tasks.length;i++){
            if(tasks[i] === task) taskIndex = i;
        }
        tasks[taskIndex] = task;

        onChangeCallback && onChangeCallback(tasks);
    }

    function setCompleted(task, n) {
        if (n >= 0 && n <= task.estimate) {
            task.spent = n;
            task.remaining = task.estimate - task.spent;
            onChangeCallback && onChangeCallback(tasks);
        } 
    }

    function onChange(callback) {
        onChangeCallback = callback;
    }

    function _filter(predicte) {
        var matched = [];
        tasks.forEach(function (task) {
            predicte(task) && matched.push(task);
        });
        return matched;
    }

    return {
        create: create,
        find: find,
        get: get,
        getAll: getAll,
        remove: remove,
        onChange: onChange,
        editTask: editTask,
        setCompleted: setCompleted
    };
};

