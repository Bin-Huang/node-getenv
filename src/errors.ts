export class NeedEnvError extends Error {
    constructor(env: string) {
        super(`node-getenv: the environment variable ${env} required but cannot be parsed!`)
    }
}
