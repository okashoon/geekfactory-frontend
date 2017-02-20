var assert = require('assert'),
    school = require('./school');

describe('School', function () {
    describe('#Person', function(){
        it('getRole returns undefined', function(){
            var person = new school.Person('Ahmed');
            assert.equal('undefined', typeof person.getRole());
        });

        it('getInfo returns the name with undefined role', function(){
            var person = new school.Person('Ahmed');
            assert.equal('My name is Ahmed. I am a undefined.', person.getInfo());
        });
    });

    describe('#Student', function(){
        it('getRole returns Student', function(){
            var student = new school.Student('Ahmed');
            assert.equal('Student', student.getRole());
        });

        it('getInfo returns the name with Student role', function(){
            var student = new school.Student('Ahmed');
            assert.equal('My name is Ahmed. I am a Student.', student.getInfo());
        });
    });

    describe('#Staff', function(){
        it('getRole returns Staff', function(){
            var staff = new school.Staff('Ahmed');
            assert.equal('Staff', staff.getRole());
        });

        it('getInfo returns the name with Staff role', function(){
            var staff = new school.Staff('Ahmed');
            assert.equal('My name is Ahmed. I am a Staff.', staff.getInfo());
        });
    });

    describe('#Teacher', function(){
        it('getRole returns Staff', function(){
            var teacher = new school.Teacher('Ahmed');
            assert.equal('Staff', teacher.getRole());
        });

        it('getInfo returns the name with Staff role and subject', function(){
            var teacher = new school.Teacher('Ahmed', 'Math');
            assert.equal('My name is Ahmed. I am a Staff. I teach Math.', teacher.getInfo());
        });
    });
});