 Task = require('./task');

//create is a non constructive function that creates a manager object
var create = function(){
    
    var manager = {}
    //array to hold tasks initiated by manager
    manager.tasks = [];
    //array that contains only active tasks
    manager.activeTasks =[];
    //get is a function that gets a task by its index
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
      var task =  new Task(category, title, priority, estimate);
      //if estimate == 0 then task is finished and not active, else it is active
      if(task.estimate !== 0) this.activeTasks.push(task);
      this.tasks.push(task);
      return task;
    }
    return manager;
}







exports.create = create;