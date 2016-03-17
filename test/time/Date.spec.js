var expect = require("expect.js"),
    variables = require("../.."),
    sync = require("../helpers/syncConverter");

var type = new variables.time.Date(),
    converter = sync(type.converter);

describe("time.Date.converter", function () {

    it("should return a vanilla date by '1985-12-20'", function () {
        var text = "1985-12-20";
        expect(converter(text).getUTCFullYear()).to.equal(1985);
    });

    it("should throw an error by 'invalid' because it is not a date", function () {
        expect(function () {
            converter("invalid");
        }).to.throwError();
    });

});