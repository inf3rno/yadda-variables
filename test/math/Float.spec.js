var expect = require("expect.js"),
    variables = require("../.."),
    sync = require("../helpers/syncConverter");

var type = new variables.math.Float(),
    converter = sync(type.converter);

describe("math.Float.converter", function () {

    it("should return 2.1 by '2.1'", function () {
        expect(converter("2.1")).to.equal(2.1);
    });

    it("should return 2.1 by '2,1'", function () {
        expect(converter("2,1")).to.equal(2.1);
    });

    it("should return 2 by '2.0'", function () {
        expect(converter("2.0")).to.equal(2);
    });

    it("should throw error by 'a' because it is not a number", function () {
        expect(function () {
            converter("a")
        }).to.throwError();
    });

});