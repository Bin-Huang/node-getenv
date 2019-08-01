export function _getNumEnv<T>(name: string, defaults: T): number | T {
  const v = process.env[name]
  if (!v) {
    return defaults
  }
  const n = Number(v)
  return Object.is(n, NaN) ? defaults : n
}

export function _getStrEnv<T>(name: string, defaults: T): string | T {
  const v = process.env[name]
  return v ? v : defaults
}

export function _getBoolEnv<T>(name: string, defaults: T): boolean | T {
  const v = process.env[name]
  if (!v) {
    return defaults
  }
  switch (v.toUpperCase()) {
    case 'TRUE':
    case 'YES':
    case 'ON':
    case 'OPEN':
    case 'T':
    case 'Y':
      return true

    case 'FALSE':
    case 'NO':
    case 'OFF':
    case 'CLOSE':
    case 'F':
    case 'N':
      return false

    default:
      return defaults
  }
}
