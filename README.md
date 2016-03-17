# yadda-variables
Yadda variable patterns and converters

By Yadda examples like this one:

```js
var Yadda = require('yadda');
var English = Yadda.localisation.English;
var Dictionary = Yadda.Dictionary;
var converters = Yadda.converters;
var assert = require('assert');

module.exports = (function() {

    var dictionary = new Dictionary()
        .define('integer', /(\d+)/, converters.integer)
        .define('float', /(\d+.\d+)/, converters.float)
        .define('date', /(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)/, converters.date)
        .define('period', /(\d+) (days|months|years)/, function(quantity, units, cb) {
            cb(null, { quantity: parseInt(quantity), units: units });
        });
    var library = English.library(dictionary)

    .define('Expect $integer to be an integer', function(i, next) {
        assert.equal(typeof i, 'number');
        assert(i % 1 === 0);
        next();
    })

    .define('Expect $float to be a float', function(f, next) {
        assert.equal(typeof f, 'number');
        assert(f % 1 !== 0);
        next();
    })

    .define('Expect $date to be a date', function(d, next) {
        assert.equal(Object.prototype.toString.call(d), '[object Date]');
        next();
    })

    .define('Expect $period to have a quantity of $integer and units of $units', function(period, quantity, units, next) {
        assert.equal(period.quantity, quantity);
        assert.equal(period.units, units);
        next();
    });

    return library;
})();

```

we use regex patterns and Yadda converters to capture and convert parameters.

I'd like to collect the common patterns and converters to make this easier. So the 

```js
    var dictionary = new Dictionary()
        .define('integer', /(\d+)/, converters.integer)
        .define('float', /(\d+.\d+)/, converters.float)
        .define('date', /(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)/, converters.date)
        .define('period', /(\d+) (days|months|years)/, function(quantity, units, cb) {
            cb(null, { quantity: parseInt(quantity), units: units });
        });
```

part of the code would be something like this:

```js
    var vars = require("yadda-variables");

    var dictionary = new Dictionary();
    var variables = require("yadda-variables");
    variables.defineAll(dictionary, {
        integer: new variables.numeric.Integer(),
        float: new variables.numeric.Float(),
        date: new variables.moment.Date(),
        period: new variables.moment.Duration()
    });
```

Ofc. it would be possible to apply custom patterns if necessary, but in most of the cases the default patterns work properly.

## Supported types

I use every converter from the `Yadda.converters` in my types to be consistent with the lib.

I use the `.*` pattern in every type, so the pattern can be freely replaced, for example `$mytext` in the following code will match only on texts containing the "new" word.

```
    variables.define(dictionary, "mytext", new variables.string.Text({pattern: /.*new.*/}));
```

If the converter cannot parse the given value, then it will raise an error and the interpreter won't be able to run the test.

### string.Text

This sets the value of `$mytext` to the matched text.

```
    variables.define(dictionary, "mytext", new variables.string.Text());
```

### time.Date

This sets the value of `$mydate` to a vanilla js Date object.

```
    variables.define(dictionary, "mydate", new variables.time.Date());
```

### moment.Date

This sets the value of `$mydate` to a [moment.js](http://momentjs.com/) Date object.

```
    variables.define(dictionary, "mydate", new variables.moment.Date());
```

### moment.Duration

This sets the value of `$myduration` to a [moment.js](http://momentjs.com/) Duration object.

```
    variables.define(dictionary, "myduration", new variables.moment.Duration());
```

### math.Integer

This sets the value of `$mynumber` to an integer number. It uses `parseInt()`, so it can handle float numbers as well.

```
    variables.define(dictionary, "mynumber", new variables.math.Integer());
```

### math.Float

This sets the value of `$mynumber` to a float number. It uses `parseFloat()` and supports comma not just dot as decimal mark.

```
    variables.define(dictionary, "mynumber", new variables.math.Float());
```

### math.Boolean

This sets the value of `$mytruth` to a boolean. It converts only falsy text like 'no', 'false', 0, etc... to `false`, otherwise the value will be `true`.

```
    variables.define(dictionary, "mytruth", new variables.math.Boolean());
```

### path.URI

This sets the value of `$myuri` to a parsed URI object using the [URL module of Node.js](https://nodejs.org/docs/latest/api/url.html). Be aware that this parses relative URIs as well, so it does not do any validation.

```
    variables.define(dictionary, "myuri", new variables.path.URI());
```

### path.FileSystem

This sets the value of `$mypath` to a parsed path object using the [path module of Node.js](https://nodejs.org/docs/latest/api/path.html). Be aware that this parses relative paths as well, so it does not do any validation.

```
    variables.define(dictionary, "mypath", new variables.path.FileSystem());
```

### data.List

This sets the value of `$mylist` to an array by converting new line separated text.

```
    variables.define(dictionary, "mylist", new variables.date.List());
```

An example list `['a','b','c']` looks like this:

```
a
b
c
```

### data.Table

This sets the value of `$mytable` to an array of objects by converting a [cucumber table](https://github.com/cucumber/cucumber/wiki/scenario-outlines).

```
    variables.define(dictionary, "mytable", new variables.date.Table());
```

An example table `[{a:'x',b:'y'}, {a:'p',b:'q'}]` looks like this:

```
a | b
x | y
p | q
```