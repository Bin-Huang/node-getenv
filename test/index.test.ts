import test from 'ava'
import { getEnvBool, getEnvNum, getEnvStr } from '../src/index'

let preEnv = {}
test.before(() => {
  preEnv = process.env
})
test.afterEach(() => {
  process.env = preEnv
})

test.serial('Test function _getNumEnv', t => {
  process.env.SETTING_TEST = '2.4'
  t.is(getEnvNum('SETTING_TEST', null), 2.4)

  process.env.SETTING_TEST = '0'
  t.is(getEnvNum('SETTING_TEST', null), 0)

  process.env.SETTING_TEST = ''
  t.is(getEnvNum('SETTING_TEST', 100), 100)

  process.env.SETTING_TEST = undefined
  t.is(getEnvNum('SETTING_TEST', 100), 100)
})

test.serial('Test function _getStrEnv', t => {
  process.env.SETTING_TEST = 'hello'
  t.is(getEnvStr('SETTING_TEST', null), 'hello')

  process.env.SETTING_TEST = ''
  t.is(getEnvStr('SETTING_TEST', null), null)
})

test.serial('Test function _getBoolEnv', t => {
  process.env.SETTING_TEST = 'true'
  t.is(getEnvBool('SETTING_TEST', null), true)

  process.env.SETTING_TEST = 'Open'
  t.is(getEnvBool('SETTING_TEST', null), true)

  process.env.SETTING_TEST = 'YES'
  t.is(getEnvBool('SETTING_TEST', null), true)

  process.env.SETTING_TEST = 'T'
  t.is(getEnvBool('SETTING_TEST', null), true)

  process.env.SETTING_TEST = 'y'
  t.is(getEnvBool('SETTING_TEST', null), true)

  process.env.SETTING_TEST = 'false'
  t.is(getEnvBool('SETTING_TEST', null), false)

  process.env.SETTING_TEST = 'CLOSE'
  t.is(getEnvBool('SETTING_TEST', null), false)

  process.env.SETTING_TEST = 'no'
  t.is(getEnvBool('SETTING_TEST', null), false)

  process.env.SETTING_TEST = 'f'
  t.is(getEnvBool('SETTING_TEST', null), false)

  process.env.SETTING_TEST = 'n'
  t.is(getEnvBool('SETTING_TEST', null), false)

  process.env.SETTING_TEST = undefined
  t.is(getEnvBool('SETTING_TEST', true), true)

  process.env.SETTING_TEST = ''
  t.is(getEnvBool('SETTING_TEST', true), true)

  process.env.SETTING_TEST = 'other_value'
  t.is(getEnvBool('SETTING_TEST', false), false)
})
