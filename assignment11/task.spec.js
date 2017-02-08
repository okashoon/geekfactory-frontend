var assert = require('assert'),
    Task = require('./task');

describe('Task', function () {
    describe('#constructor', function () {
        it('should set title, category, priority, and estimate', function () {
            var task = new Task('work', 'code review ahmed\'s pull-request', 1, 1.5);
            assert.equal('work', task.category);
            assert.equal('code review ahmed\'s pull-request', task.title);
            assert.equal(1, task.priority);
            assert.equal(1.5, task.estimate);
            assert.equal(0, task.spent);
            assert.equal(1.5, task.remaining);
        });
    });

    describe('#track', function () {
        it('should update spent and remaining when track called with positive number', function () {
            var task = new Task('work', 'code review', 1, 1.5);
            task.track(1);
            assert.equal(1.5, task.estimate);
            assert.equal(1, task.spent);
            assert.equal(0.5, task.remaining);
        });
        
        it('should not update spent and remaining when track called with -ve number', function () {
            var task = new Task('work', 'code review', 1, 1.5);
            task.track(-1);
            assert.equal(1.5, task.estimate);
            assert.equal(0, task.spent);
            assert.equal(1.5, task.remaining);
        });
        
        it('should not update spent and remaining when track called with non number', function () {
            var task = new Task('work', 'code review', 1, 1.5);
            task.track('s');
            assert.equal(1.5, task.estimate);
            assert.equal(0, task.spent);
            assert.equal(1.5, task.remaining);
        });
    });

    describe('#done', function () {
        it('should return true when remaining is 0', function () {
            var task = new Task('work', 'code review', 1, 1.5);
            task.track(1.5);
            assert.equal(true, task.done());
        });
        
        it('should return false when ramining is not 0', function () {
            var task = new Task('work', 'code review', 1, 1.5);
            task.track(1.0);            
            assert.equal(false, task.done());
        });
    });

    describe('#complete', function () {
        it('should set remaining to 0', function () {
            var task = new Task('work', 'code review', 1, 1.5);
            task.complete();
            assert.equal(0, task.remaining);
            assert.equal(true, task.done());
        });
    });
});