Get and parse environment variables more easily.

```
npm i node-getenv --save
```

```javascript
const env = require('node-getenv')

// PORT=8080 node index.js
const port = env.getNum('PORT')  // 8080 (number)


// CONSUMER_ON=on node index.js
env.getBool('CONSUMER_ON')  // true

// node index.js
env.getNum('CONCURRENCY', 4)  // 4 (default value)

// node index.js
env.requireNum('CONCURRENCY')   // throw error
env.requireNumOrExit('CONCURRENCY')   // log error, then process exit
```

**getNum(key, defaults)**

Get environment variate in number type.

If the environment variate is undefined or not a valid number, return the default value.

**getStr(key, defaults)**

Get environment variate in string type.

If the environment variate is undefined, return the default value.

**getBool(key, defaults)**

Get environment variate in boolean type, supported values **without case sensitive**:

- Truly: `true`, `yes`, `on`, `open`, `t`, `y`, `1`.

- Falsely: `false`, `no`, `off`, `close`, `f`, `n`, `0`.

If the environment variate is undefined or unsupported, return the default value.

**bindEnv(defaultValues)**

Bind environment variates with default values, then returns them. It has no effect on real environmental variables (in `process.env`).

---------------------------------------

**License**: MIT