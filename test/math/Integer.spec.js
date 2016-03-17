var expect = require("expect.js"),
    variables = require("../.."),
    sync = require("../helpers/syncConverter");

var type = new variables.math.Integer(),
    converter = sync(type.converter);

describe("math.Integer.converter", function () {

    it("should return 2 by '2.8'", function () {
        expect(converter("2.8")).to.equal(2);
    });

    it("should return 2 by '2,8'", function () {
        expect(converter("2,8")).to.equal(2);
    });

    it("should return 2 by '2'", function () {
        expect(converter("2")).to.equal(2);
    });

    it("should throw error by 'a' because it is not a number", function () {
        expect(function () {
            converter("a")
        }).to.throwError();
    });

});