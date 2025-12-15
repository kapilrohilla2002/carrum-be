import { Injectable } from "@nestjs/common";
import { Types } from "mongoose";
import { JwtService as NestJwtService } from "@nestjs/jwt";
import AppConfigService from "src/configs/appConfig.service";
import { JWT_TOKEN_TYPES } from "src/constants/constants";


@Injectable()
export default class JwtService {

    constructor(
        private readonly nestJwtService: NestJwtService,
        private readonly appConfigService: AppConfigService
    ) { }


    async createAccessToken(userId: Types.ObjectId, identityId: Types.ObjectId, appVersion: number) {
        const token = this.nestJwtService.signAsync({
            userId: userId.toString(),
            identityId: identityId.toString(),
            appVersion: appVersion,
            type: JWT_TOKEN_TYPES.ACCESS
        }, {
            secret: this.appConfigService.jwtAccessTokenSecret,
            expiresIn: "1 day"
        })

        console.log("ACCESS_TOKEN")
        console.log(token)
        console.log("ACCESS_TOKEN")

        return token
    }

    async createRefreshToken(userId: Types.ObjectId, identityId: Types.ObjectId, appVersion: number) {
        const token = this.nestJwtService.signAsync({
            userId: userId.toString(),
            identityId: identityId.toString(),
            appVersion: appVersion,
            type: JWT_TOKEN_TYPES.REFRESH
        }, {
            secret: this.appConfigService.jwtRefreshTokenSecret,
            expiresIn: "7 days"
        })

        console.log("REFRESH_TOKEN")
        console.log(token)
        console.log("REFRESH_TOKEN")

        return token
    }

    async createGuestToken(identityId: Types.ObjectId, appVersion: number) {
        const token = await this.nestJwtService.signAsync({
            identityId: identityId.toString(),
            appVersion: appVersion,
            type: JWT_TOKEN_TYPES.GUEST
        }, {
            secret: this.appConfigService.jwtGuestTokenSecret,
            expiresIn: "365 days"
        })

        console.log("GUEST_TOKEN")
        console.log(token)
        console.log("GUEST_TOKEN")

        return token;
    }


    async verifyGuestToken(token: string) {
        return this.nestJwtService.verifyAsync(token, {
            secret: this.appConfigService.jwtGuestTokenSecret
        })
    }

    async verifyAccessToken(token: string) {
        return this.nestJwtService.verifyAsync(token, {
            secret: this.appConfigService.jwtAccessTokenSecret
        })
    }

    async verifyRefreshToken(token: string) {
        return this.nestJwtService.verifyAsync(token, {
            secret: this.appConfigService.jwtRefreshTokenSecret
        })
    }

    decodeToken(token: string) {
        return this.nestJwtService.decode(token)
    }
}