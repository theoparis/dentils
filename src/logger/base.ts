import { ILogger } from "./interface.ts";

export class BaseLogger implements ILogger {
    constructor(public base: ILogger = console) {}

    trace(message?: unknown): void {
        this.base.trace(message);
    }
    debug(message?: unknown): void {
        this.base.debug(message);
    }
    info(message?: unknown): void {
        this.base.info(message);
    }
    warn(message?: unknown): void {
        this.base.warn(message);
    }
    error(message?: unknown): void {
        this.base.error(message);
    }
}
