var moment = require("moment"),
    uri = require("url"),
    path = require("path"),
    converters = require("yadda").converters;

var Type = function (config) {
    this.converter = this.converter.bind(this);
    if (!config)
        return;
    if (config.pattern instanceof RegExp)
        this.pattern = config.pattern;
};
Type.prototype = {
    constructor: Type,
    pattern: /(.*?)/,
    converter: function (value, next) {
        var err,
            res;
        try {
            res = this.parse(value);
        } catch (e) {
            err = e;
        }
        next(err, res);
    }
};


var TextType = function (config) {
    Type.call(this, config);
};
TextType.prototype = {
    constructor: TextType,
    converter: converters.pass_through
};
Object.setPrototypeOf(TextType.prototype, Type.prototype);


var DateType = function (config) {
    Type.call(this, config);
};
DateType.prototype = {
    constructor: DateType,
    converter: converters.date
};
Object.setPrototypeOf(DateType.prototype, Type.prototype);


var MomentDateType = function (config) {
    Type.call(this, config);
};
MomentDateType.prototype = {
    constructor: MomentDateType,
    parse: function (text) {
        var date = moment(text);
        if (!date.isValid())
            throw new Error("The '" + text + "' cannot be parsed as date.");
        return date;
    }
};
Object.setPrototypeOf(MomentDateType.prototype, Type.prototype);


var MomentDurationType = function (config) {
    Type.call(this, config);
};
MomentDurationType.prototype = {
    constructor: MomentDurationType,
    durationPattern: /^\d+ \w+(?: \d+ \w+)*$/,
    unitPatterns: {
        seconds: /^s(?:ec(?:ond)?s?)?$/i,
        minutes: /^m(?:in(?:ute)?s?)?$/i,
        hours: /^h(?:ours?)?$/i,
        days: /^d(?:ays?)?$/i,
        weeks: /^w(?:weeks?)?$/i,
        months: /^months?$/i,
        years: /^y(?:ears?)?$/i
    },
    parse: function (text) {
        var o = {};
        if (!this.durationPattern.test(text))
            throw new Error("The '" + text + "' cannot be parsed as duration.");
        var pairs = text.split(" ");
        for (var i = 0, l = pairs.length / 2; i < l; ++i)
            this.parsePair(o, text, pairs[i * 2], pairs[i * 2 + 1]);
        return moment.duration(o);
    },
    parsePair: function (o, text, amountText, unitText) {
        var amount = parseInt(amountText);
        if (isNaN(amount))
            throw new Error("Amount '" + amountText + "' no supported by parsing duration '" + text + "'");
        var unit;
        for (var actualUnit in this.unitPatterns)
            if (this.unitPatterns[actualUnit].test(unitText)) {
                unit = actualUnit;
                break;
            }
        if (!unit)
            throw new Error("Unit '" + unitText + "' no supported by parsing duration '" + text + "'.");
        if (o.hasOwnProperty(unit))
            throw new Error("Duplicated unit '" + unit + "' by parsing duration '" + text + "'.");
        o[unit] = amount;
    }
};
Object.setPrototypeOf(MomentDurationType.prototype, Type.prototype);


var IntegerType = function (config) {
    Type.call(this, config);
};
IntegerType.prototype = {
    constructor: IntegerType,
    converter: converters.integer
};
Object.setPrototypeOf(IntegerType.prototype, Type.prototype);


var FloatType = function (config) {
    Type.call(this, config);
};
FloatType.prototype = {
    constructor: FloatType,
    converter: function (value, next) {
        converters.float(value.split(",").join("."), next);
    }
};
Object.setPrototypeOf(FloatType.prototype, Type.prototype);


var BooleanType = function (config) {
    Type.call(this, config);
};
BooleanType.prototype = {
    constructor: BooleanType,
    falsyPattern: /^(?:f(?:alse)?|no?|0+)$/i,
    parse: function (text) {
        return !this.falsyPattern.test(text);
    }
};
Object.setPrototypeOf(BooleanType.prototype, Type.prototype);


var UriType = function (config) {
    Type.call(this, config);
};
UriType.prototype = {
    constructor: UriType,
    parse: function (text) {
        return uri.parse(text);
    }
};
Object.setPrototypeOf(UriType.prototype, Type.prototype);


var PathType = function (config) {
    Type.call(this, config);
};
PathType.prototype = {
    constructor: PathType,
    parse: function (text) {
        return path.parse(text);
    }
};
Object.setPrototypeOf(PathType.prototype, Type.prototype);


var ListType = function (config) {
    Type.call(this, config);
};
ListType.prototype = {
    constructor: ListType,
    converter: converters.list
};
Object.setPrototypeOf(ListType.prototype, Type.prototype);


var TableType = function (config) {
    Type.call(this, config);
};
TableType.prototype = {
    constructor: TableType,
    converter: converters.table
};
Object.setPrototypeOf(TableType.prototype, Type.prototype);


module.exports = {
    defineAll: function (dictionary, variables) {
        for (var variable in variables)
            if (variables.hasOwnProperty(variable))
                this.define(variable, variables[variable]);
    },
    define: function (dictionary, variable, type) {
        dictionary.define(variable, type.pattern, type.converter);
    },
    string: {
        Text: TextType
    },
    time: {
        Date: DateType
    },
    moment: {
        Date: MomentDateType,
        Duration: MomentDurationType
    },
    math: {
        Integer: IntegerType,
        Float: FloatType,
        Boolean: BooleanType
    },
    path: {
        URI: UriType,
        FileSystem: PathType
    },
    data: {
        List: ListType,
        Table: TableType
    }
};