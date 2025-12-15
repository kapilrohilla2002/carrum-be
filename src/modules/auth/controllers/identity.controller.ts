import { Body, Controller, Headers, HttpException, HttpStatus, Post, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { IdentityService } from "../services/identity.service";
import { UserService } from "../services/user.service";
import * as identityDto from "../validator/identity.dto";
import ZodValidationPipe from "src/common/pipes/zodValidation.pipe";
import { GuestAuthenticationGuard } from "src/common/guard/authentication.guard";
import JwtService from "../services/jwt.service";


@Controller("/auth/identity")
export class IdentityController {
    constructor(
        private readonly identityService: IdentityService,
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) { }


    @Post("/")
    @UsePipes(new ZodValidationPipe(identityDto.createIdentityBodySchema))
    async createIdentity(@Body() body: identityDto.CreateIdentityDto, @Headers() headers: Headers) {
        const userAgent = headers['user-agent']

        if (!userAgent) {
            throw new HttpException("user-agent header is required", HttpStatus.BAD_REQUEST)
        }

        const identity = await this.identityService.createIdentity({
            appType: body.appType,
            appVersion: body.appVersion,
            userAgent: userAgent,
            macId: body.macId
        })
        return identity
    }

    @Post("/guest-token")
    @UsePipes(new ZodValidationPipe(identityDto.generateGuestTokenSchema))
    async generateGuestToken(@Body() body: identityDto.GenerateGuestTokenDto) {
        const identity = await this.identityService.getIdentityById(body.identityId)

        if (!identity) {
            throw new HttpException("identity not found", HttpStatus.BAD_REQUEST)
        }

        return identity
    }

    @Post("/login")
    @UseGuards(GuestAuthenticationGuard)
    @UsePipes(new ZodValidationPipe(identityDto.loginSchema))
    async login(@Body() body: identityDto.LoginDto, @Headers() headers: any) {
        const guestToken = headers['authorization'] || headers['Authorization'];
        if (!guestToken) {
            throw new HttpException("Authorization header is required", HttpStatus.BAD_REQUEST);
        }

        // Decode token to get identityId
        const decoded = this.jwtService.decodeToken(guestToken);
        const identityId = decoded?.identityId;

        const user = await this.identityService.login(body.phone, body.password, identityId);
        return user;
    }

    @Post("/users")
    @UseGuards(GuestAuthenticationGuard)
    @UsePipes(new ZodValidationPipe(identityDto.createUserSchema))
    async createUser(@Body() body: identityDto.CreateUserDto) {
        const user = await this.userService.createUser({
            name: body.name,
            phone: body.phone,
            password: body.password,
            userType: body.userType,
            email: body.email,
            autoDialerId: body.autoDialerId,
            roles: body.roles
        });
        return user;
    }

}