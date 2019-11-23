/**
 * Get environment variate in number type.
 * If the environment variate is undefined or not a valid number, return the default value.
 * @param name Environment variate
 * @param defaults (Optional) Default value
 */
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

/**
 * Get environment variate in string type.
 * If the environment variate is undefined, return the default value.
 * @param name Environment variate
 * @param defaults (Optional) Default value
 */
export function getEnvStr(name: string): string | undefined
export function getEnvStr(name: string, defaults: string): string
export function getEnvStr(name: string, defaults?: string): string | undefined {
  const v = process.env[name]
  if (v === undefined) {
    return defaults
  }
  return v
}

/**
 * Get environment variate in boolean type, supported values without case sensitive:
 *   Truly: 'true', 'yes', 'on', 'open', 't', 'y', '1'.
 *   Falsely: 'false', 'no', 'off', 'close', 'f', 'n', '0'.
 * If the environment variate is undefined or unsupported, return the default value.
 * @param name Environment variate
 * @param defaults (Optional) Default value
 */
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
    case '1':
      return true
    case 'FALSE':
    case 'NO':
    case 'OFF':
    case 'CLOSE':
    case 'F':
    case 'N':
    case '0':
      return false
    default:
      return defaults
  }
}

type Binded<T> = {
  [P in keyof T]: T[P] extends undefined ? string | undefined : T[P]
};

export function bindEnv<T>(defaultEnvs: T): Binded<T> {
  for (const name of Object.keys(defaultEnvs)) {
    const defaultValue = defaultEnvs[name]
    switch (typeof defaultValue) {
      case 'boolean':
        defaultEnvs[name] = getEnvBool(name, defaultValue)
        break;
      case 'number':
        defaultEnvs[name] = getEnvNum(name, defaultValue)
        break;
      case 'string':
        defaultEnvs[name] = getEnvStr(name, defaultValue)
        break;
      default:
        defaultEnvs[name] = getEnvStr(name)
    }
  }
  return defaultEnvs as Binded<T>
}
