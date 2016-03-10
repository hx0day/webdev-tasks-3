var assert = require('assert');

// Ваша супер библиотека
var flow = require('../lib/flow.js');


describe('Check serial', function () {

    it('should check correct work', function (done) {
        var result = [];

        function callback(error, data) {
            result = data;
            console.log(result);
            assert.equal(result, 3);
            done();
        }

        function test2(data, callback) {
            setTimeout(function () {
                callback(false, data + 2);
            }, 300);

        }

        function test1(callback) {
            setTimeout(function () {
                callback(false, 1);
            }, 100);
        }

        var test_function = [test1, test2];
        flow.serial(test_function, callback);

    });

    it('should check work with error', function (done) {
        var result = [];

        function callback(error, data) {
            result = data;
            assert.deepEqual(result, 3);
            assert.ok(error);
            done();
        }

        function test3(data, callback) {
            setTimeout(function () {
                callback(false, data + 1);
            }, 0);

        }

        function test2(data, callback) {
            setTimeout(function () {
                callback(true, data + 2);
            }, 300);

        }

        function test1(callback) {
            setTimeout(function () {
                callback(false, 1);
            }, 100);
        }


        var test_function = [test1, test2, test3];
        flow.serial(test_function, callback);

    });
    it('should check emptyArray', function (done) {
        var result = [];

        function callback(error, data) {
            assert.deepEqual(error, null);
            done();
        }

        var test_function = [];
        flow.serial(test_function, callback);
    });
});
describe('Check parallel', function () {


    it('should check work with error', function (done) {
        var result = [];


        function test2(callback) {
            setTimeout(function () {
                callback(true, 1);
            }, 0);
        }

        function test1(callback) {
            setTimeout(function () {
                callback(true, 1);
            }, 0);
        }

        var test_function = [test1, test2];

        flow.parallel(test_function, function (error, data) {
            result.push(error);
            assert.equal(result.length, 1);
            done();
        });


    });

    it('should check correct work', function (done) {
        var result = [];

        function callback(error, data) {
            result = data;
            assert.deepEqual(result.sort(), [1, 2].sort());
            done();
        }

        function test2(callback) {
            setTimeout(function () {
                callback(false, 1);
            }, 0);

        }

        function test1(callback) {
            setTimeout(function () {
                callback(false, 2);
            }, 0);
        }

        var test_function = [test1, test2];
        flow.parallel(test_function, callback);

    });

    it('should check emptyArray', function (done) {
        var result = [];

        function callback(error, data) {
            assert.deepEqual(error, null);
            done();
        }

        var test_function = [];
        flow.parallel(test_function, callback);
    });
});
describe('Check map', function () {
    it('should check correct work', function (done) {
        var values = [5, 2];

        function callback(error, data) {
            assert.deepEqual(error, false);
            assert.deepEqual(data, values);
            done();
        }


        function test_function(val, callback) {
            setTimeout(function () {
                callback(false, val);
            }, 0);
        }

        flow.map(values, test_function, callback);
    });

    it('should check work with error', function (done) {
        var values = [5, 2, 3];

        function callback(error, data) {
            assert.deepEqual(error, true);
            assert.deepEqual(data, [5]);
            done();
        }


        function test_function(val, callback) {
            setTimeout(function () {
                var error = false;
                if (val === 2) {
                    error = true;
                }
                callback(error, val);
            }, 0);
        }

        flow.map(values, test_function, callback);
    });

    it('should check emptyArray', function (done) {

        function callback(error, data) {
            assert.deepEqual(error, null);
            done();
        }

        function test_function(val, callback) {
            setTimeout(function () {
                callback(false, val);
            }, 0);
        }

        flow.map([], test_function, callback);
    });
});
