var assert = require('assert');

// Ваша супер библиотека
var flow = require('../lib/flow.js');

describe('Check', function () {

    it('should check serial', function (done) {
        var result = [];

        function callback(error, data) {
            result = data;
            assert.deepEqual(result, [2, 1]);
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

    it('should check serial error', function (done) {
        var result = [];

        function callback(error, data) {
            result = data;
            assert.deepEqual(result, [2]);
            assert.ok(error);
            done();
        }

        function test3(callback) {
            setTimeout(function () {
                callback(false, 1);
            }, 0);

        }
        function test2(callback) {
            setTimeout(function () {
                callback(true, 1);
            }, 0);

        }

        function test1(callback) {
            setTimeout(function () {
                callback(false, 2);
            }, 0);
        }

        var test_function = [test1, test2, test3];
        flow.parallel(test_function, callback);

    });

    it('should check emptyArray in serial', function (done) {
        var result = [];

        function callback(error, data) {
            assert.deepEqual(error, null);
            done();
        }

        var test_function = [];
        flow.serial(test_function, callback);
    });


    it('should check parallel one error', function (done) {
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

    it('should check parallel', function (done) {
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

    it('should check emptyArray in parallel', function (done) {
        var result = [];

        function callback(error, data) {
            assert.deepEqual(error, null);
            done();
        }

        var test_function = [];
        flow.parallel(test_function, callback);
    });


    it('should check emptyArray in map', function (done) {
        var result = [];

        function callback(error, data) {
            assert.deepEqual(error, null);
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
        flow.map([], test_function, callback);
    });
});
