var assert = require('assert'),
    closure = require('./closure2');

describe('Closure', function () {
    describe('#saveForLater', function () {
        it('should create a function that gets a name and print it later when executed', function () {      
            var saveForLater = closure.saveForLater("MyName")
            assert.equal("MyName", saveForLater());
        });
    });

    describe('#executeLater', function () {
        it('should create a function that gets a function to be later executed', function () {      
            var executeLater = closure.executeLater(function() {
                return "Code executed";
            })
            assert.equal("Code executed", executeLater());
        });
    });
});