var expect = require("expect.js"),
    variables = require("../.."),
    sync = require("../helpers/syncConverter");

var type = new variables.moment.Duration(),
    converter = sync(type.converter);

describe("moment.Duration.converter", function () {

    it("should return a duration by '2 days'", function () {
        expect(converter("2 days").humanize()).to.equal("2 days");
    });

    it("should return a duration by '2 years 9 months'", function () {
        expect(converter("2 years 9 months").humanize()).to.equal("3 years");
    });

    it("should return a duration by '5 h 15 min'", function () {
        expect(converter("5 h 15 min").humanize()).to.equal("5 hours");
    });

    it("should trow error by '5 h 6 hours' because of duplicated duration unit", function () {
        expect(function () {
            converter("5 h 6 hours");
        }).to.throwError();
    });

    it("should trow error by '5 seasons' because of unknown duration unit", function () {
        expect(function () {
            converter("5 seasons");
        }).to.throwError();
    });

    it("should trow error by '5.1 minutes' because of float quantity", function () {
        expect(function () {
            converter("5.1 minutes");
        }).to.throwError();
    });
});