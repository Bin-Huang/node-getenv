import test from 'ava'
import { getBool, getNum, getStr, getStrEnum, bindEnv } from '../src/index'

test.serial('Test function getEnvNum', t => {
  const key = 'TEST_GET_ENV_NUM'

  t.is(getNum(key), undefined)
  t.is(getNum(key, 2), 2)

  process.env[key] = '1'
  t.is(getNum(key), 1)
  t.is(getNum(key, 2), 1)

  process.env[key] = '0'
  t.is(getNum(key), 0)
  t.is(getNum(key, 2), 0)

  process.env[key] = 'other_value'
  t.is(getNum(key), undefined)
  t.is(getNum(key, 2), 2)
})

test.serial('Test function getEnvStr', t => {
  const key = 'TEST_GET_ENV_STR'

  t.is(getStr(key), undefined)
  t.is(getStr(key, 'a'), 'a')

  process.env[key] = 'b'
  t.is(getStr(key), 'b')
  t.is(getStr(key, 'a'), 'b')
})

test.serial('Test function getEnvStrEnum', t => {
  const key = 'TEST_GET_ENV_STR_ENUM'

  t.is(getStrEnum<'a' | 'b'>(key), undefined)
  t.is(getStrEnum<'a' | 'b'>(key, 'a'), 'a')

  process.env[key] = 'b'
  t.is(getStrEnum<'a' | 'b'>(key), 'b')
  t.is(getStrEnum<'a' | 'b'>(key, 'a'), 'b')
})

test.serial('Test function getEnvBool', t => {
  const key = 'TEST_GET_ENV_BOOL'

  t.is(getBool(key), undefined)
  t.is(getBool(key, true), true)

  process.env[key] = 'true'
  t.is(getBool(key), true)
  t.is(getBool(key, false), true)

  process.env[key] = 'Open'
  t.is(getBool(key), true)
  t.is(getBool(key, false), true)

  process.env[key] = 'YES'
  t.is(getBool(key), true)
  t.is(getBool(key, false), true)

  process.env[key] = 'T'
  t.is(getBool(key), true)
  t.is(getBool(key, false), true)

  process.env[key] = 'y'
  t.is(getBool(key), true)
  t.is(getBool(key, false), true)

  process.env[key] = 'false'
  t.is(getBool(key), false)
  t.is(getBool(key, true), false)

  process.env[key] = 'CLOSE'
  t.is(getBool(key), false)
  t.is(getBool(key, true), false)

  process.env[key] = 'no'
  t.is(getBool(key), false)
  t.is(getBool(key, true), false)

  process.env[key] = 'f'
  t.is(getBool(key), false)
  t.is(getBool(key, true), false)

  process.env[key] = 'n'
  t.is(getBool(key), false)
  t.is(getBool(key, true), false)

  process.env[key] = 'other_value'
  t.is(getBool(key), undefined)
  t.is(getBool(key, true), true)
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
