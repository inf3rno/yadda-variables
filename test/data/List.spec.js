var expect = require("expect.js"),
    variables = require("../.."),
    sync = require("../helpers/syncConverter");

var type = new variables.data.List(),
    converter = sync(type.converter);

describe("data.List.converter", function () {

    it("should return ['x','y','z'] by 'x\\ny\\nz'", function () {
        expect(JSON.stringify(converter("x\ny\nz"))).to.equal(JSON.stringify((["x", "y", "z"])));
    });
});