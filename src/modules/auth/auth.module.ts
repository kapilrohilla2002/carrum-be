import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtModule } from "@nestjs/jwt";
import { Users, UsersSchema } from "./schema/users";
import { Roles, RolesSchema } from "./schema/roles";
import { Permission, PermissionSchema } from "./schema/permission";
import { UserContacts, UserContactsSchema } from "./schema/userContacts";
import { Identity, IdentitySchema } from "./schema/identity";
import { IdentityRepository } from "./repositories/identity.repository";
import { UserRepository } from "./repositories/user.repository";
import { RoleRepository } from "./repositories/role.repository";
import { PermissionRepository } from "./repositories/permission.repository";
import { IdentityService } from "./services/identity.service";
import { UserService } from "./services/user.service";
import RolesService from "./services/role.service";
import PermissionService from "./services/permission.service";
import { IdentityController } from "./controllers/identity.controller";
import { RoleController } from "./controllers/role.controller";
import { PermissionController } from "./controllers/permission.controller";
import JwtService from "./services/jwt.service";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Users.name, schema: UsersSchema },
            { name: Roles.name, schema: RolesSchema },
            { name: Permission.name, schema: PermissionSchema },
            { name: UserContacts.name, schema: UserContactsSchema },
            { name: Identity.name, schema: IdentitySchema }
        ]),
        JwtModule.register({})
    ],
    controllers: [IdentityController, RoleController, PermissionController],
    providers: [
        IdentityService,
        UserService,
        UserRepository,
        RoleRepository,
        PermissionRepository,
        JwtService,
        IdentityRepository,
        RolesService,
        PermissionService
    ],
    exports: [UserService, IdentityService, JwtService]
})
export class AuthModule { }