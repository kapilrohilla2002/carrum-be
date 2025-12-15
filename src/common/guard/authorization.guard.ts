import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ROLES } from 'src/constants/constants';

@Injectable()
export class AuthorizationGuard implements CanActivate {
    constructor(private readonly allowedRoles: string[]) { }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        return this.validateRequest(request);
    }

    async validateRequest(request: any) {
        if (!request.user) {
            throw new HttpException("User not authenticated", HttpStatus.UNAUTHORIZED);
        }

        const userRoles = request.user.roles || [];
        const hasRequiredRole = this.allowedRoles.some(role => userRoles.includes(role));

        if (!hasRequiredRole) {
            throw new HttpException("Insufficient permissions. Required role: " + this.allowedRoles.join(" or "), HttpStatus.FORBIDDEN);
        }

        return true;
    }
}