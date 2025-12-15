import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { IdentityRepository } from "../repositories/identity.repository";
import { Identity } from "../schema/identity";
import { AppTypes } from "src/constants/constants";
import JwtService from "./jwt.service";
import { UserService } from "./user.service";
import { Types } from "mongoose";

@Injectable()
export class IdentityService {
    constructor(
        private readonly identityRepository: IdentityRepository,
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) { }

    async createIdentity(identity: CreateIdentityParams) {
        const newIdentity = await this.identityRepository.createIdentity({
            appType: identity.appType,
            appVersion: identity.appVersion,
            macId: identity.macId,
            userAgent: identity.userAgent,
            lastLoginUserId: null,
            guestToken: null,
            accessToken: null,
            refreshToken: null,
        })
        const guestToken = await this.jwtService.createGuestToken(newIdentity._id, identity.appVersion)

        await this.identityRepository.updateIdentity(newIdentity._id.toString(), {
            guestToken: guestToken
        })

        return {
            token: guestToken
        }
    }

    async getIdentityById(id: string) {
        if (!Types.ObjectId.isValid(id)) {
            throw new HttpException("invalid identity id", HttpStatus.BAD_REQUEST)
        }
        const identity = await this.identityRepository.getIdentityById(id)

        if (!identity) {
            throw new HttpException("identity not found", HttpStatus.BAD_REQUEST)
        }

        const token = await this.jwtService.createGuestToken(identity._id, identity.appVersion);
        await this.identityRepository.updateIdentity(id, {
            guestToken: token
        })

        return {
            token: token
        }
    }

    async getIdentityByIdForGuard(id: string) {
        if (!Types.ObjectId.isValid(id)) {
            return null;
        }
        return this.identityRepository.getIdentityById(id);
    }

    async updateIdentity(id: string, identity: Identity) {
        const updatedIdentity = await this.identityRepository.updateIdentity(id, identity)
        return updatedIdentity
    }

    async deleteIdentity(id: string) {
        const deletedIdentity = await this.identityRepository.deleteIdentity(id)
        return deletedIdentity
    }

    async login(phone: string, password: string, identityId?: string) {
        // Find user by phone number using UserService
        const user = await this.userService.getUserByPhone(phone);

        if (!user) {
            throw new HttpException("Invalid phone or password", HttpStatus.UNAUTHORIZED);
        }

        // Check if user is active
        if (!user.isActive || user.status === 'BLOCKED') {
            throw new HttpException("User account is blocked or inactive", HttpStatus.FORBIDDEN);
        }

        // Verify password using UserService
        const isPasswordValid = await this.userService.verifyPassword(user, password);
        if (!isPasswordValid) {
            throw new HttpException("Invalid phone or password", HttpStatus.UNAUTHORIZED);
        }

        // If identityId is provided, update identity with user info and tokens
        if (identityId && Types.ObjectId.isValid(identityId)) {
            const identity = await this.identityRepository.getIdentityById(identityId);
            if (identity) {
                const accessToken = await this.jwtService.createAccessToken(
                    user._id,
                    identity._id,
                    identity.appVersion
                );
                const refreshToken = await this.jwtService.createRefreshToken(
                    user._id,
                    identity._id,
                    identity.appVersion
                );

                await this.identityRepository.updateIdentity(identityId, {
                    lastLoginUserId: user._id,
                    accessToken: await accessToken,
                    refreshToken: await refreshToken,
                    guestToken: null
                });

                // Update user's last login identity using UserService
                await this.userService.updateUserLastLoginIdentity(user._id.toString(), identity._id);

                return {
                    user: {
                        id: user._id.toString(),
                        name: user.name,
                        userType: user.userType,
                        phone: user.userContacts.find(contact => contact.isPrimary)?.phoneNo,
                        email: user.userContacts.find(contact => contact.isPrimary)?.email,
                        roles: user.roles
                    },
                    accessToken: await accessToken,
                    refreshToken: await refreshToken
                };
            }
        }

        // Return user info without tokens if no identity provided
        return {
            user: {
                id: user._id.toString(),
                name: user.name,
                userType: user.userType,
                phone: user.userContacts.find(contact => contact.isPrimary)?.phoneNo,
                email: user.userContacts.find(contact => contact.isPrimary)?.email,
                roles: user.roles
            }
        };
    }
}

type CreateIdentityParams = {
    appType: typeof AppTypes[keyof typeof AppTypes]
    appVersion: number
    userAgent: string
    macId: string
}