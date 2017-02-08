var Employee = function(name, department){
    this.name = name;
    this.department = department;
    this.role = 'employee';
}
Employee.prototype.getInfo = function(){
    return 'My name is ' + this.name + '. I am ' + this.role + ' in the ' + this.department + ' department.';
}

var Manager = function(name, department, reports){
    Employee.call(this,name, department);
    this.role = 'manager';
    this.reports = reports;
}
Manager.prototype = Object.create(Employee.prototype);
Manager.prototype.getInfo = function(){
    return Employee.prototype.getInfo.call(this) + ' I manage ' + this.reports + ' employees.';
}


exports.Manager = Manager;
exports.Employee = Employee;