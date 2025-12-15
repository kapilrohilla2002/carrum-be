import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { ZodError } from 'zod';

interface ErrorResponse {
    status: 'error';
    error: string | object;
}

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<FastifyReply>();

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let error: string | object = 'An unknown error occurred';

        if (exception instanceof HttpException) {
            status = exception.getStatus();
            const exceptionResponse = exception.getResponse();

            if (typeof exceptionResponse === 'string') {
                error = exceptionResponse;
            } else if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
                // Check if the response contains a ZodError structure (has errors array)
                if ('errors' in exceptionResponse && Array.isArray(exceptionResponse.errors)) {
                    error = {
                        message: 'Validation failed',
                        errors: exceptionResponse.errors,
                    };
                } else if ('message' in exceptionResponse && Array.isArray(exceptionResponse.message)) {
                    error = {
                        message: exceptionResponse.message,
                        ...(exceptionResponse as object),
                    };
                } else if ('error' in exceptionResponse) {
                    error = exceptionResponse.error!;
                } else {
                    error = exceptionResponse;
                }
            }
        } else if (exception instanceof ZodError) {
            status = HttpStatus.UNPROCESSABLE_ENTITY;
            error = {
                message: 'Validation failed',
                errors: exception.issues,
            };
        } else if (exception instanceof Error) {
            error = exception.message;
        }

        const errorResponse: ErrorResponse = {
            status: 'error',
            error,
        };

        response.status(status).send(errorResponse);
    }
}

