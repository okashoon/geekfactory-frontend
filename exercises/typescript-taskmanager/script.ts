
var manager = new TaskManager();

var task = manager.create("home", "assign", 2,2,1);
manager.onChange(function(tasks): any{
    console.log("callback");
    console.log(tasks);
})

