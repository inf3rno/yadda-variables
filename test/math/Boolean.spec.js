var expect = require("expect.js"),
    variables = require("../.."),
    sync = require("../helpers/syncConverter");

var type = new variables.math.Boolean(),
    converter = sync(type.converter);

describe("math.Boolean.converter", function () {

    it("should return false by 'false'", function () {
        expect(converter("false")).to.equal(false);
    });

    it("should return false by 'no'", function () {
        expect(converter("no")).to.equal(false);
    });

    it("should return false by '0'", function () {
        expect(converter("false")).to.equal(false);
    });

    it("should return true by 'true'", function () {
        expect(converter("true")).to.equal(true);
    });

    it("should return true by 'yes'", function () {
        expect(converter("yes")).to.equal(true);
    });

    it("should return true by '1'", function () {
        expect(converter("1")).to.equal(true);
    });

});