var expect = require("expect.js"),
    variables = require("../.."),
    sync = require("../helpers/syncConverter");

var type = new variables.path.URI(),
    converter = sync(type.converter);

describe("path.URI.converter", function () {

    it("should return the parsed URI", function () {
        var google = "https://www.google.com/";
        expect(converter(google).format()).to.equal(google);
    });
});