import test from 'ava'
import { getEnvBool, getEnvNum, getEnvStr, bindEnv } from '../src/index'

test.serial('Test function getEnvNum', t => {
  const key = 'TEST_GET_ENV_NUM'

  t.is(getEnvNum(key), undefined)
  t.is(getEnvNum(key, 2), 2)

  process.env[key] = '1'
  t.is(getEnvNum(key), 1)
  t.is(getEnvNum(key, 2), 1)

  process.env[key] = '0'
  t.is(getEnvNum(key), 0)
  t.is(getEnvNum(key, 2), 0)

  process.env[key] = 'other_value'
  t.is(getEnvNum(key), undefined)
  t.is(getEnvNum(key, 2), 2)
})

test.serial('Test function getEnvStr', t => {
  const key = 'TEST_GET_ENV_STR'

  t.is(getEnvStr(key), undefined)
  t.is(getEnvStr(key, 'a'), 'a')

  process.env[key] = 'b'
  t.is(getEnvStr(key), 'b')
  t.is(getEnvStr(key, 'a'), 'b')
})

test.serial('Test function getEnvBool', t => {
  const key = 'TEST_GET_ENV_BOOL'

  t.is(getEnvBool(key), undefined)
  t.is(getEnvBool(key, true), true)

  process.env[key] = 'true'
  t.is(getEnvBool(key), true)
  t.is(getEnvBool(key, false), true)

  process.env[key] = 'Open'
  t.is(getEnvBool(key), true)
  t.is(getEnvBool(key, false), true)

  process.env[key] = 'YES'
  t.is(getEnvBool(key), true)
  t.is(getEnvBool(key, false), true)

  process.env[key] = 'T'
  t.is(getEnvBool(key), true)
  t.is(getEnvBool(key, false), true)

  process.env[key] = 'y'
  t.is(getEnvBool(key), true)
  t.is(getEnvBool(key, false), true)

  process.env[key] = 'false'
  t.is(getEnvBool(key), false)
  t.is(getEnvBool(key, true), false)

  process.env[key] = 'CLOSE'
  t.is(getEnvBool(key), false)
  t.is(getEnvBool(key, true), false)

  process.env[key] = 'no'
  t.is(getEnvBool(key), false)
  t.is(getEnvBool(key, true), false)

  process.env[key] = 'f'
  t.is(getEnvBool(key), false)
  t.is(getEnvBool(key, true), false)

  process.env[key] = 'n'
  t.is(getEnvBool(key), false)
  t.is(getEnvBool(key, true), false)

  process.env[key] = 'other_value'
  t.is(getEnvBool(key), undefined)
  t.is(getEnvBool(key, true), true)
})


test.serial('Test function bindEnv', t => {
  process.env['bindEnv_1'] = '1'
  process.env['bindEnv_a'] = 'a'
  process.env['bindEnv_t'] = 'true'
  process.env['bindEnv_u'] = 'hello'

  const envs = bindEnv({
    bindEnv_1: 999999999999,
    bindEnv_2: 999999999999,
    bindEnv_a: 'zzzzzzzzzzz',
    bindEnv_b: 'zzzzzzzzzzz',
    bindEnv_t: false,
    bindEnv_f: false,
    bindEnv_u: undefined,
  })

  t.deepEqual(
    envs,
    {
      bindEnv_1: 1,
      bindEnv_2: 999999999999,  // default value
      bindEnv_a: 'a',
      bindEnv_b: 'zzzzzzzzzzz', // default value
      bindEnv_t: true,
      bindEnv_f: false, // default value
      bindEnv_u: 'hello',
    },
  )
})
