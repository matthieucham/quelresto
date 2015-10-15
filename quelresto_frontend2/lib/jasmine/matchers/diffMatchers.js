//https://github.com/engina/jasmine-diff-matchers
//Code has been modified

'using strict';

// Namespace
var ea = {
    matchers: {},
    utils: {}
};

ea.matchers.toArrayEqual = function (util, customTesters) {
    customTesters = customTesters || [];

    return {
        compare: function (actual, expected) {
            var result = {
                pass: true
            };

            var r = ea.utils.arrayDiff(actual, expected, customTesters);

            if (r.pass !== true) {
                result.pass = false;
                result.actual = r.item1;
                result.expected = r.item2;
                result.path = r.stack;
                result.message = 'Object at index ' + (r.stack ? r.stack.join('->') : '') + ' does not match. Actual: ' + r.item1 + ' Expected: ' + r.item2 + '\n';
                var ppA = JSON.stringify(actual, undefined, 2).split('\n');
                var ppE = JSON.stringify(expected, undefined, 2).split('\n');

                var colWidth = 40;
                result.message += 'Actual' + ea.utils.charfill(' ', colWidth - 6) + ' | Expected\n';
                for (var i = 0, len = Math.max(ppA.length, ppE.length); i < len; i++) {
                    var a = ppA[i];
                    var b = ppE[i];
                    var line = '';
                    if (a === undefined || b === undefined || a !== b) {
                        line += ea.utils.ansi.red;
                        result.pass = false;
                    } else {
                        line += ea.utils.ansi.green;
                    }

                    if (a === undefined) {
                        a = '';
                    }
                    if (b === undefined) {
                        b = '';
                    }

                    a = a.replace(/"/g, '_');
                    b = b.replace(/"/g, '_');

                    line += a.substr(0, colWidth);
                    line += ea.utils.charfill(' ', colWidth - Math.min(a.length, colWidth));
                    line += ' | ';
                    line += b.substr(0, colWidth);
                    line += '\n';
                    result.message += line;

                }
            }
            return result;
        }
    };
};

ea.matchers.toUnsortedArrayEqual = function (util, customTesters) {
    return {
        compare: function (actual, expected) {
            ea.utils.arrayRecursiveSort(actual);
            ea.utils.arrayRecursiveSort(expected);
            return ea.matchers.toArrayEqual(util, customTesters).compare(actual, expected);
        }
    };
};

ea.matchers.toStringEqual = function (util, customTesters) {
    customTesters = customTesters || [];

    return {
        compare: function (actual, expected) {
            var result = {
                pass: false
            };

            if (typeof actual !== 'string') {
                result.message = 'Actual result is not a string.';
                return result;
            }

            if (typeof expected !== 'string') {
                result.message = 'Expected should be a string';
                return result;
            }

            var len = Math.max(actual.length, expected.length);
            var strA = '',
                strB = '',
                color;

            function setColor(c) {
                if (color !== c) {
                    color = c;
                } else {
                    return;
                }
                strA += color;
                strB += color;
            }

            function escape(ch) {
                if (ch === '\x1B') {
                    return '\\x1B';
                }
                return ch;
            }
            result.pass = true;
            for (var i = 0; i < len; i++) {
                var a = escape(actual[i]);
                var b = escape(expected[i]);
                if (a === undefined || b === undefined || a !== b) {
                    setColor(ea.utils.ansi.red);
                    result.pass = false;
                } else {
                    setColor(ea.utils.ansi.green);
                }
                strA += a || '';
                strB += b || '';
            }
            setColor(ea.utils.ansi.none);

            if (result.pass !== true) {
                result.message = 'Strings are not identical\nActual  : ' + strA + '\nExpected: ' + strB;
            }
            return result;
        }
    };
};

ea.utils.arrayDiff = function (arr1, arr2, customTesters, stack) {
    customTesters = customTesters || [];
    stack = stack || [];
    var result;
    for (var i = 0, l = Math.max(arr1.length, arr2.length); i < l; i++) {
        if (arr1[i] instanceof Array && arr2[i] instanceof Array) {
            stack.push(i);
            var r = ea.utils.arrayDiff(arr1[i], arr2[i], customTesters, stack);
            if (r.pass !== true) {
                return r;
            }
            stack.pop();
        } else {
            result = undefined;
            for (var j = 0; j < customTesters.length; j++) {
                var customTesterResult = customTesters[j](arr1[i], arr2[i]);
                if (customTesterResult !== undefined) {
                    result = customTesterResult;
                }
            }
            if (result === undefined) {
                // No custom testers
                result = arr1[i] === arr2[i];
            }
            if (result !== true) {
                stack.push(i);

                return {
                    pass: false,
                    stack: stack,
                    item1: arr1[i],
                    item2: arr2[i]
                };
            }
        }
    }
    return {
        pass: true
    };
};

ea.utils.charfill = function (ch, n) {
    if (n < 1) {
        return '';
    }
    return new Array(n + 1).join(ch);
};

ea.utils.arrayRecursiveSort = function (arr) {
    for (var i = 0, l = arr.length; i < l; i++) {
        if (arr[i] instanceof Array) {
            ea.utils.arrayRecursiveSort(arr[i]);
        }
    }
    arr.sort();
    return arr;
};

ea.utils.ansi = {
    green: '\x1B[32m',
    red: '\x1B[31m',
    yellow: '\x1B[33m',
    none: '\x1B[0m'
};
beforeEach(function () {
    jasmine.addMatchers(ea.matchers);
});