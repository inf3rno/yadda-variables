module.exports = function (converter) {
    var results;
    var done = function (err, res) {
        if (err)
            throw err;
        else
            results = res;
    };
    return function (value) {
        converter(value, done);
        return results;
    };
};