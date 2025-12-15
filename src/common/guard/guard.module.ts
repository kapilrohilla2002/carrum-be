import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Identity, IdentitySchema } from "src/modules/auth/schema/identity";
import { Users, UsersSchema } from "src/modules/auth/schema/users";
import JwtService from "src/modules/auth/services/jwt.service";
import { IdentityService } from "src/modules/auth/services/identity.service";
import { UserService } from "src/modules/auth/services/user.service";
import { IdentityRepository } from "src/modules/auth/repositories/identity.repository";
import { UserRepository } from "src/modules/auth/repositories/user.repository";
import { AccessAuthenticationGuard, GuestAuthenticationGuard } from "./authentication.guard";
import { AuthorizationGuard } from "./authorization.guard";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Identity.name, schema: IdentitySchema },
            { name: Users.name, schema: UsersSchema }
        ]),
        JwtService
    ],
    providers: [
        IdentityRepository,
        UserRepository,
        UserService,
        IdentityService,
        GuestAuthenticationGuard,
        AccessAuthenticationGuard,
        AuthorizationGuard
    ],
    exports: [GuestAuthenticationGuard, AccessAuthenticationGuard, AuthorizationGuard]
})
export class GuardModule { }