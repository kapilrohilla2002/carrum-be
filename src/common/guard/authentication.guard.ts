import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JWT_TOKEN_TYPES } from 'src/constants/constants';
import JwtService from 'src/modules/auth/services/jwt.service';
import { IdentityService } from 'src/modules/auth/services/identity.service';
import { UserService } from 'src/modules/auth/services/user.service';
import { Types } from 'mongoose';

// Extend FastifyRequest to include identity and user
declare module 'fastify' {
    interface FastifyRequest {
        identity?: {
            id: string;
            identityId: string;
            appVersion: number;
            appType?: string;
        };
        user?: {
            id: string;
            userId: string;
            name: string;
            userType: string;
            phone?: string;
            email?: string;
            roles: string[];
        };
    }
}

@Injectable()
export class GuestAuthenticationGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly identityService: IdentityService
    ) { }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        return this.validateRequest(request);
    }

    async validateRequest(request: any) {
        const guestToken = request.headers?.authorization || request.headers?.Authorization;
        if (!guestToken) {
            throw new HttpException("Authorization header is required", HttpStatus.UNAUTHORIZED);
        }

        const isValidToken = await this.jwtService.verifyGuestToken(guestToken);
        if (!isValidToken) {
            throw new HttpException("Invalid token", HttpStatus.UNAUTHORIZED);
        }

        const claims = this.jwtService.decodeToken(guestToken);

        if (claims.type !== JWT_TOKEN_TYPES.GUEST)
            throw new HttpException("Invalid token type", HttpStatus.UNAUTHORIZED);

        if (!claims.identityId || !Types.ObjectId.isValid(claims.identityId)) {
            throw new HttpException("Invalid identity ID in token", HttpStatus.UNAUTHORIZED);
        }

        const identity = await this.identityService.getIdentityByIdForGuard(claims.identityId);
        if (!identity)
            throw new HttpException("Identity not found", HttpStatus.UNAUTHORIZED);

        request.identity = {
            id: identity._id.toString(),
            identityId: identity._id.toString(),
            appVersion: claims.appVersion || identity.appVersion,
            appType: identity.appType
        };

        return true;
    }
}


@Injectable()
export class AccessAuthenticationGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly identityService: IdentityService,
        private readonly userService: UserService
    ) { }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        return this.validateRequest(request);
    }

    async validateRequest(request: any) {
        const accessToken = request.headers?.authorization || request.headers?.Authorization;
        if (!accessToken) {
            throw new HttpException("Authorization header is required", HttpStatus.UNAUTHORIZED);
        }

        const isValidToken = await this.jwtService.verifyAccessToken(accessToken);
        if (!isValidToken) {
            throw new HttpException("Invalid token", HttpStatus.UNAUTHORIZED);
        }

        const claims = this.jwtService.decodeToken(accessToken);

        if (claims.type !== JWT_TOKEN_TYPES.ACCESS) {
            throw new HttpException("Invalid token type", HttpStatus.UNAUTHORIZED);
        }

        if (!claims.identityId
            || !Types.ObjectId.isValid(claims.identityId)
            || !claims.appVersion
            || !claims.userId
            || !Types.ObjectId.isValid(claims.userId)
        ) {
            throw new HttpException("Invalid token claims", HttpStatus.UNAUTHORIZED);
        }

        const identity = await this.identityService.getIdentityByIdForGuard(claims.identityId);
        if (!identity) {
            throw new HttpException("Identity not found", HttpStatus.UNAUTHORIZED);
        }

        if (identity.appVersion !== claims.appVersion) {
            throw new HttpException("Invalid app version", HttpStatus.UNAUTHORIZED);
        }

        const user = await this.userService.getUserById(claims.userId);
        if (user && user.isActive && user.status !== 'BLOCKED') {
            const primaryContact = user.userContacts?.find((contact: any) => contact.isPrimary);
            request.user = {
                id: user._id.toString(),
                userId: user._id.toString(),
                name: user.name,
                userType: user.userType,
                phone: primaryContact?.phoneNo,
                email: primaryContact?.email,
                roles: user.roles || []
            };

            return true;
        }

        throw new HttpException("User not found or inactive", HttpStatus.UNAUTHORIZED);
    }
}
