var expect = require("expect.js"),
    variables = require("../.."),
    sync = require("../helpers/syncConverter");

var type = new variables.moment.Date(),
    converter = sync(type.converter);

describe("moment.Date.converter", function () {

    it("should return a date by '1985-12-20'", function () {
        expect(converter("1985-12-20").format("DD-MM-YYYY")).to.equal("20-12-1985");
    });

    it("should throw an error by 'invalid' because it is not a date", function () {
        expect(function () {
            converter("invalid");
        }).to.throwError();
    });
});