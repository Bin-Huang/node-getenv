Get and parse environment variables more easily. It is written in typescript with **100%** unit test coverage.

```
npm i node-getenv --save
```

```javascript
const { getEnvNum, getEnvBool, getEnvStr, bindEnv } = require('node-getenv')

// PORT=8080
getEnvNum('PORT')  // 8080 (number)


// CONSUMER_ON=on
getEnvBool('CONSUMER_ON')  // true


// DEBUG=controller
getEnvStr('DEBUG')  // 'controller'


getEnvNum('UNDEFINED_ENV', 4)  // 4 (default value)


// CONCURRENCY=3
const envs = bindEnv({
  CONCURRENCY: 10,  // default value 10
  LOG_LEVEL: 'debug', // default value 'debug'
})
console.log(envs.CONCURRENCY) // 3
console.log(envs.LOG_LEVEL) // 'debug' (default value)
```

**getEnvNum(key, defaults)**

Get environment variate in number type.

If the environment variate is undefined or not a valid number, return the default value.

**getEnvStr(key, defaults)**

Get environment variate in string type.

If the environment variate is undefined, return the default value.

**getEnvBool(key, defaults)**

Get environment variate in boolean type, supported values **without case sensitive**:

- Truly: `true`, `yes`, `on`, `open`, `t`, `y`, `1`.

- Falsely: `false`, `no`, `off`, `close`, `f`, `n`, `0`.

If the environment variate is undefined or unsupported, return the default value.

**bindEnv(defaultValues)**

Bind environment variates with default values, then returns them. It has no effect on real environmental variables (in `process.env`).

---------------------------------------

**License**: MIT