var assert = require('assert'),
    taskManager = require('./task-manager');

describe('taskManager', function () {
    describe('#create', function () {
        it('should create task', function () {
            var manager = taskManager.create();
            var task = manager.create('work', 'code review', 1, 1.5);
            assert.equal('work', task.category);
            assert.equal('code review', task.title);
            assert.equal(1, task.priority);
            assert.equal(1.5, task.estimate);
            assert.equal(0, task.spent);
            assert.equal(1.5, task.remaining);
        });
    });

    describe('#get', function () {
        it('should get added task', function () {
            var manager = taskManager.create();
            var task = manager.create('work', 'code review', 1, 1.5);
            assert(task === manager.get(0));
        });
    });

    describe('#getAll', function () {
        it('should get all added tasks', function () {
            var manager = taskManager.create();
            var task = manager.create('work', 'code review', 1, 1.5);
            assert(1 === manager.getAll().length);
            assert(task === manager.getAll()[0]);
        });

        it('should get active tasks only when activeOnly is true', function () {
            var manager = taskManager.create();
            var task = manager.create('work', 'code review', 1, 1.5);
            var task2 = manager.create('work', 'code review', 1, 0);
            assert(1 === manager.getAll(true).length);
            assert(task === manager.getAll()[0]);
        });
    });

    describe('#find', function () {
        it('should find added task if title match', function () {
            var manager = taskManager.create();
            var task = manager.create('work', 'Code Review', 1, 1.5);
            assert(task === manager.find('code r')[0]);
        });

        it('should find added task if category match', function () {
            var manager = taskManager.create();
            var task = manager.create('work', 'Code Review', 1, 1.5);
            assert(task === manager.find('work')[0]);
        });
        
        it('should not find added task if title and category do not match', function () {
            var manager = taskManager.create();
            var task = manager.create('work', 'Code Review', 1, 1.5);
            assert(0 === manager.find('code rr').length);
        });
    });

    describe('#remove', function () {
        it('should remove added task by index', function () {
            var manager = taskManager.create();
            var task = manager.create('work', 'Code Review', 1, 1.5);
            manager.remove(0);
            assert.equal(0, manager.getAll().length);
        });
        
        it('should remove added task by reference', function () {
            var manager = taskManager.create();
            var task = manager.create('work', 'Code Review', 1, 1.5);
            manager.remove(task);
            assert.equal(0, manager.getAll().length);
        });

        it('should not remove if out of index', function () {
            var manager = taskManager.create();
            var task = manager.create('work', 'Code Review', 1, 1.5);
            manager.remove(10);
            assert.equal(1, manager.getAll().length);
        });
    });
});