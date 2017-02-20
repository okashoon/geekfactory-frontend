"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Person = (function () {
    function Person(name, role) {
        this.name = name;
        this.role = role;
        this.getRole = function () {
            return this.role;
        };
        this.getInfo = function () {
            return "My name is " + this.name + ". I am a " + this.getRole() + ".";
        };
    }
    return Person;
}());
exports.Person = Person;
var Student = (function (_super) {
    __extends(Student, _super);
    function Student(name, role) {
        return _super.call(this, name, "Student") || this;
    }
    return Student;
}(Person));
exports.Student = Student;
var Staff = (function (_super) {
    __extends(Staff, _super);
    function Staff(name, role) {
        return _super.call(this, name, "Staff") || this;
    }
    return Staff;
}(Person));
exports.Staff = Staff;
var Teacher = (function (_super) {
    __extends(Teacher, _super);
    function Teacher(name, subject) {
        var _this = _super.call(this, name, "Teacher") || this;
        _this.subject = subject;
        _this.getInfo = function () {
            return "My name is " + this.name + ". I am a " + this.getRole() + ". " + "I teach " + this.subject + ".";
        };
        return _this;
    }
    return Teacher;
}(Staff));
exports.Teacher = Teacher;
