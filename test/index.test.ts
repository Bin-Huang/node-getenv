import test from 'ava'
import { NeedEnvError } from '../src/errors'
import * as env from '../src/index'

test.serial('test getNum', t => {
  const key = 'TEST_GET_ENV_NUM'

  t.is(env.getNum(key), undefined)
  t.is(env.getNum(key, 2), 2)

  process.env[key] = '1'
  t.is(env.getNum(key), 1)
  t.is(env.getNum(key, 2), 1)

  process.env[key] = '0'
  t.is(env.getNum(key), 0)
  t.is(env.getNum(key, 2), 0)

  process.env[key] = 'other_value'
  t.is(env.getNum(key), undefined)
  t.is(env.getNum(key, 2), 2)
})

test.serial('test getStr', t => {
  const key = 'TEST_GET_ENV_STR'

  t.is(env.getStr(key), undefined)
  t.is(env.getStr(key, 'a'), 'a')

  process.env[key] = 'b'
  t.is(env.getStr(key), 'b')
  t.is(env.getStr(key, 'a'), 'b')

  let expect: 'a' | 'b' | 'c' | undefined = env.getStr<'a'|'b'|'c'>(key)
  let expect2: 'a' | 'b' | 'c' = env.getStr<'a'|'b'|'c'>(key, 'a')
})

test.serial('test getBool', t => {
  const key = 'TEST_GET_ENV_BOOL'

  t.is(env.getBool(key), undefined)
  t.is(env.getBool(key, true), true)

  process.env[key] = 'true'
  t.is(env.getBool(key), true)
  t.is(env.getBool(key, false), true)

  process.env[key] = 'Open'
  t.is(env.getBool(key), true)
  t.is(env.getBool(key, false), true)

  process.env[key] = 'YES'
  t.is(env.getBool(key), true)
  t.is(env.getBool(key, false), true)

  process.env[key] = 'T'
  t.is(env.getBool(key), true)
  t.is(env.getBool(key, false), true)

  process.env[key] = 'y'
  t.is(env.getBool(key), true)
  t.is(env.getBool(key, false), true)

  process.env[key] = 'false'
  t.is(env.getBool(key), false)
  t.is(env.getBool(key, true), false)

  process.env[key] = 'CLOSE'
  t.is(env.getBool(key), false)
  t.is(env.getBool(key, true), false)

  process.env[key] = 'no'
  t.is(env.getBool(key), false)
  t.is(env.getBool(key, true), false)

  process.env[key] = 'f'
  t.is(env.getBool(key), false)
  t.is(env.getBool(key, true), false)

  process.env[key] = 'n'
  t.is(env.getBool(key), false)
  t.is(env.getBool(key, true), false)

  process.env[key] = 'other_value'
  t.is(env.getBool(key), undefined)
  t.is(env.getBool(key, true), true)
})


test.serial('test bindEnv', t => {
  process.env['bindEnv_1'] = '1'
  process.env['bindEnv_a'] = 'a'
  process.env['bindEnv_t'] = 'true'
  process.env['bindEnv_u'] = 'hello'

  const envs = env.bindEnv({
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

test.serial('test requireNum', t => {
  const key = 'TEST_REQUIRENUM'
  const method = env.requireNum

  t.throws(() => method(key), NeedEnvError)

  process.env[key] = '1'
  t.notThrows(() => method(key))
  t.is(method(key), 1)

  process.env[key] = '0'
  t.notThrows(() => method(key))
  t.is(method(key), 0)

  process.env[key] = 'other_value'
  t.throws(() => method(key), NeedEnvError)
})

test.serial('test requireStr', t => {
  const key = 'TEST_REQUIRESTR'
  const method = env.requireStr

  t.throws(() => method(key), NeedEnvError)

  process.env[key] = 'b'
  t.notThrows(() => method(key))
  t.is(method(key), 'b')

  let expect: 'a' | 'b' | 'c' = env.requireStr<'a'|'b'|'c'>(key)
})

test.serial('test requireBool', t => {
  const key = 'TEST_REQUIREBOOL'
  const method = env.requireBool

  t.throws(() => method(key), NeedEnvError)

  process.env[key] = 'true'
  t.notThrows(() => method(key))
  t.is(method(key), true)

  process.env[key] = 'Open'
  t.notThrows(() => method(key))
  t.is(method(key), true)

  process.env[key] = 'YES'
  t.notThrows(() => method(key))
  t.is(method(key), true)

  process.env[key] = 'T'
  t.notThrows(() => method(key))
  t.is(method(key), true)

  process.env[key] = 'y'
  t.notThrows(() => method(key))
  t.is(method(key), true)

  process.env[key] = 'false'
  t.notThrows(() => method(key))
  t.is(method(key), false)

  process.env[key] = 'CLOSE'
  t.notThrows(() => method(key))
  t.is(method(key), false)

  process.env[key] = 'no'
  t.notThrows(() => method(key))
  t.is(method(key), false)

  process.env[key] = 'f'
  t.notThrows(() => method(key))
  t.is(method(key), false)

  process.env[key] = 'n'
  t.notThrows(() => method(key))
  t.is(method(key), false)

  process.env[key] = 'other_value'
  t.throws(() => method(key), NeedEnvError)
})
