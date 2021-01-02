export class ApplicationError extends Error {
    static isDomain(error: DomainError | Error): error is DomainError {
        return (error as DomainError).domain !== undefined;
    }
    constructor(message: string) {
        super(message);
    }
}

export class DomainError extends ApplicationError {
    domain: boolean = true;
    constructor(message: string) {
        super(message);
    }
}