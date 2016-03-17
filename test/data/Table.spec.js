var expect = require("expect.js"),
    variables = require("../.."),
    sync = require("../helpers/syncConverter");

var type = new variables.data.Table(),
    converter = sync(type.converter);

describe("data.Table.converter", function () {

    it("should return [{a:'x',b:'y'},{a:'p',b:'q'}] by 'a|b\\nx|y\\np|q'", function () {
        expect(JSON.stringify(converter("a|b\nx|y\np|q"))).to.equal(JSON.stringify(([{a: "x", b: "y"}, {a: "p", b: "q"}])));
    });
});