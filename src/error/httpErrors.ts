class HttpErrors extends Error {

    constructor(message?: string) {
        super(message)
        this.name = this.constructor.name;
    }

}

/**
 *Status Code 401
 * 
*/
export class UnauthorisedError extends HttpErrors {

}


export class ConflictError extends HttpErrors {}


