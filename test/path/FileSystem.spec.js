var expect = require("expect.js"),
    path = require("path"),
    variables = require("../.."),
    sync = require("../helpers/syncConverter");

var type = new variables.path.FileSystem(),
    converter = sync(type.converter);

describe("path.FileSystem.converter", function () {

    it("should return the parsed filesystem path", function () {
        var file = "/a/b/c.html";
        expect(path.format(converter(file)).split("\\").join("/")).to.equal(file);
    });
});