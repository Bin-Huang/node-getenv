import test from 'ava'
import { _getBoolEnv, _getNumEnv, _getStrEnv } from '../src/index'

let preEnv = {}
test.before(() => {
  preEnv = process.env
})
test.afterEach(() => {
  process.env = preEnv
})

test.serial('Test function _getNumEnv', t => {
  process.env.SETTING_TEST = '2.4'
  t.is(_getNumEnv('SETTING_TEST', null), 2.4)

  process.env.SETTING_TEST = '0'
  t.is(_getNumEnv('SETTING_TEST', null), 0)

  process.env.SETTING_TEST = ''
  t.is(_getNumEnv('SETTING_TEST', 100), 100)

  process.env.SETTING_TEST = undefined
  t.is(_getNumEnv('SETTING_TEST', 100), 100)
})

test.serial('Test function _getStrEnv', t => {
  process.env.SETTING_TEST = 'hello'
  t.is(_getStrEnv('SETTING_TEST', null), 'hello')

  process.env.SETTING_TEST = ''
  t.is(_getStrEnv('SETTING_TEST', null), null)
})

test.serial('Test function _getBoolEnv', t => {
  process.env.SETTING_TEST = 'true'
  t.is(_getBoolEnv('SETTING_TEST', null), true)

  process.env.SETTING_TEST = 'Open'
  t.is(_getBoolEnv('SETTING_TEST', null), true)

  process.env.SETTING_TEST = 'YES'
  t.is(_getBoolEnv('SETTING_TEST', null), true)

  process.env.SETTING_TEST = 'T'
  t.is(_getBoolEnv('SETTING_TEST', null), true)

  process.env.SETTING_TEST = 'y'
  t.is(_getBoolEnv('SETTING_TEST', null), true)

  process.env.SETTING_TEST = 'false'
  t.is(_getBoolEnv('SETTING_TEST', null), false)

  process.env.SETTING_TEST = 'CLOSE'
  t.is(_getBoolEnv('SETTING_TEST', null), false)

  process.env.SETTING_TEST = 'no'
  t.is(_getBoolEnv('SETTING_TEST', null), false)

  process.env.SETTING_TEST = 'f'
  t.is(_getBoolEnv('SETTING_TEST', null), false)

  process.env.SETTING_TEST = 'n'
  t.is(_getBoolEnv('SETTING_TEST', null), false)

  process.env.SETTING_TEST = undefined
  t.is(_getBoolEnv('SETTING_TEST', true), true)

  process.env.SETTING_TEST = ''
  t.is(_getBoolEnv('SETTING_TEST', true), true)

  process.env.SETTING_TEST = 'other_value'
  t.is(_getBoolEnv('SETTING_TEST', false), false)
})
