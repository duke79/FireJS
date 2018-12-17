# pyWeb

## Installation

```
npm install pyweb
```

## Usage

```js
let pw = require('pyweb')

pw.fire(cmd = "myFunc arg1", function (res, err, state) {
    if (typeof (res) !== 'undefined')
        console.log(res);
});
```
