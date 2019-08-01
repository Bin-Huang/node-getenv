export function getEnvNum(name: string): number | undefined
export function getEnvNum(name: string, defaults: number): number
export function getEnvNum(name: string, defaults?: number): number | undefined {
  const v = process.env[name]
  if (v === undefined) {
    return defaults
  }
  const n = Number(v)
  return Object.is(n, NaN) ? defaults : n
}

export function getEnvStr(name: string): string | undefined
export function getEnvStr(name: string, defaults: string): string
export function getEnvStr(name: string, defaults?: string): string | undefined {
  const v = process.env[name]
  if (v === undefined) {
    return defaults
  }
  return v
}

export function getEnvBool(name: string): boolean | undefined
export function getEnvBool(name: string, defaults: boolean): boolean
export function getEnvBool(name: string, defaults?: boolean): boolean | undefined {
  const v = process.env[name]
  if (v === undefined) {
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
