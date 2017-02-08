//create is a non constructive function that creates a manager object
var create = function(){
    
    var manager = {}
    //tasks is a prperty of the manager object that contains an array of all created tasks
    manager.tasks = [];
    //array that contains only active tasks
    manager.activeTasks =[];
    //get is a function that gets a specific task from the tasks array
    manager.get = function(n){
        return this.tasks[n];
    }
    manager.getAll = function(activeOnly){
        //if activeOnly is false or not present return all tasks
        if(!activeOnly) return this.tasks;

        //if activeOnly is true return only active tasks
        else     return this.activeTasks;
        
    }

    manager.find = function(string){
        var result = [];
        //iterate through tasks array 
        for(var i = 0; i < this.tasks.length; i++){
            //if string argument matches category or title (or part of it, non case-sensitive) add the task to results array
            if(this.tasks[i].category.toLowerCase().includes(string.toLowerCase()) || 
            this.tasks[i].title.toLowerCase().includes(string.toLowerCase())) result.push(this.tasks[i]);
        }
        return result;
    }
    manager.remove = function(n){
        this.tasks.splice(n,1);
    }

    //create is a non-constructive function that returns a task object
    manager.create = function(category, title, priority, estimate){
        var task = {};
        task.category = category;
        task.title = title;
        task.priority = priority;
        task.estimate = estimate;
        //initiate spent property to 0
        task.spent = 0;
        task.remaining = task.estimate - task.spent;
        task.active = false;
        //if task estimate == 0 then it is not active, else it is still active
        if(task.estimate != 0) {
            task.active = true;
            this.activeTasks.push(task);
        }
        //push the created task object to the creating manager's task array
        this.tasks.push(task);
        return task;
    }
    return manager;
}







exports.create = create;