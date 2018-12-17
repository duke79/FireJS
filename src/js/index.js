let pw = require('./pyweb')

exports.fire = pw.fire;

pw.fire(cmd = "abc hulo", function (res, err, state) {
    if (typeof (res) !== 'undefined')
        console.log(res);
});