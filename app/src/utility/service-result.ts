export interface ErrorResponse {
    errorMessage: string;
    errorType: string;
    details?: unknown;
}

export class ServiceResult<T> {
    public readonly success: boolean;
    public readonly failure: boolean;
    public readonly statusCode: number;
    public readonly status: string;
    public readonly content: T | null;
    public readonly error: ErrorResponse | null;

    private constructor(content: T | null, error: ErrorResponse | null, success: boolean) {
        this.content = content;
        this.error = error;
        this.success = success;
        this.failure = !success;
        this.statusCode = success ? 200 : 400;
        this.status = success ? 'Success' : 'Error';
    }

    public static Succeeded<T>(content: T): ServiceResult<T> {
        return new ServiceResult<T>(content, null, true);
    }

    public static Failed<T>(error: ErrorResponse): ServiceResult<T> {
        return new ServiceResult<T>(null, error, false);
    }
}
