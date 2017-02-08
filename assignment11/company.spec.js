var assert = require('assert'),
    company = require('./company');

describe('Company', function () {
    describe('#Employee', function () {
        it('constructor sets the correct properties', function () {
            var employee = new company.Employee('Ahmed', 'IT');
            assert.equal('Ahmed', employee.name);
            assert.equal('IT', employee.department);
            assert.equal('employee', employee.role);
        });

        it('getInfo returns the name with employee role under IT department', function () {
            var employee = new company.Employee('Ahmed', 'IT');
            assert.equal('My name is Ahmed. I am employee in the IT department.', employee.getInfo());
        });
    });

    describe('#Manager', function () {
        it('constructor sets the correct properties', function () {
            var manager = new company.Manager('Khaled', 'IT', 10);
            assert.equal('Khaled', manager.name);
            assert.equal('IT', manager.department);
            assert.equal('manager', manager.role);
            assert.equal(10, manager.reports);
        });

        it('getInfo returns the name with manager role under IT department with managing 10 employees', function () {
            var manager = new company.Manager('Khaled', 'IT', 10);
            assert.equal('My name is Khaled. I am manager in the IT department. I manage 10 employees.', manager.getInfo());
        });

        it('Manager inherits from Employee', function () {
            assert.equal(company.Manager.prototype.__proto__, company.Employee.prototype);
        });
    });
});