class ServerValidationError extends Error {
    errors: string[] = [];

    constructor(errors: string[]) {
        super('Server validation error');
        this.errors = errors;
    }
}

export default ServerValidationError;