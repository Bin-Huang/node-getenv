import { NeedEnvError } from './errors'

/**
 * Get environment variate in number type.
 * If the environment variate is undefined or not a valid number, return the default value.
 * @param name Environment variate
 * @param defaults (Optional) Default value
 */
export function getNum(name: string): number | undefined
export function getNum(name: string, defaults: number): number
export function getNum(name: string, defaults?: number): number | undefined {
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
export function getStr<T extends string>(name: string): T | undefined
export function getStr<T extends string>(name: string, defaults: T): T
export function getStr<T extends string>(name: string, defaults?: T): T | undefined
export function getStr(name: string): string | undefined
export function getStr(name: string, defaults: string): string
export function getStr(name: string, defaults?: string): string | undefined {
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
export function getBool(name: string): boolean | undefined
export function getBool(name: string, defaults: boolean): boolean
export function getBool(name: string, defaults?: boolean): boolean | undefined {
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
        defaultEnvs[name] = getBool(name, defaultValue)
        break;
      case 'number':
        defaultEnvs[name] = getNum(name, defaultValue)
        break;
      case 'string':
        defaultEnvs[name] = getStr(name, defaultValue)
        break;
      default:
        defaultEnvs[name] = getStr(name)
    }
  }
  return defaultEnvs as Binded<T>
}

export function requireStr<T extends string>(env: string): T
export function requireStr(env: string): string {
    const v = getStr(env)
    if (v === undefined) {
        throw new NeedEnvError(env)
    }
    return v
}

export function requireNum(env: string): number {
    const v = getNum(env)
    if (v === undefined) {
        throw new NeedEnvError(env)
    }
    return v
}

export function requireBool(env: string): boolean {
    const v = getBool(env)
    if (v === undefined) {
        throw new NeedEnvError(env)
    }
    return v
}

export function requireStrOrExit(env: string): string {
    try {
        const v = requireStr(env)
        return v
    } catch (e) {
        console.log(e.message)
        process.exit(1)
    }
}

export function requireNumOrExit(env: string): number {
    try {
        const v = requireNum(env)
        return v
    } catch (e) {
        console.log(e.message)
        process.exit(1)
    }
}

export function requireBoolOrExit(env: string): Boolean {
    try {
        const v = requireBool(env)
        return v
    } catch (e) {
        console.log(e.message)
        process.exit(1)
    }
}
