var expect = require("expect.js"),
    variables = require("../.."),
    sync = require("../helpers/syncConverter");

var type = new variables.string.Text(),
    converter = sync(type.converter);

describe("string.Text.converter", function () {

    it("should return the matched text", function () {
        var text = "Some example text.";
        expect(converter(text)).to.equal(text);
    });

});