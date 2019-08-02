Just simple utils to **get environment variables** more easily. It is written in typescript with 100% unit test coverage.

```
npm i node-getenv --save
```

```javascript
const { getEnvNum, getEnvBool, getEnvStr } = require('node-getenv')

// export PORT=8080
getEnvNum('PORT')  // 8080

// export CONSUMER_ON=yes
getEnvBool('CONSUMER_ON')  // true

// export DEBUG=controller
getEnvStr('DEBUG')  // 'controller'


getEnvNum('UNSET_ENV', 4)  // 4 (default value)
```

**getEnvNum(key, defaults)**

Get environment variate in number type.

If the environment variate is undefined or not a valid number, return the default value if possible.

**getEnvStr(key, defaults)**

Get environment variate in string type.

If the environment variate is undefined, return the default value if possible.

**getEnvBool(key, defaults)**

Get environment variate in boolean type, supported values **withou case sensitive**:

  Truly: 'true', 'yes', 'on', 'open', 't', 'y'.

  Falsely: 'false', 'no', 'off', 'close', 'f', 'n'.

If the environment variate is undefined or unsupported, return the default value if possible.


**License**: MIT