import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UserRepository } from "../repositories/user.repository";
import { UserTypes } from "src/constants/constants";
import { Types } from "mongoose";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository
    ) { }

    async getUserById(id: string) {
        if (!Types.ObjectId.isValid(id)) {
            return null;
        }
        return this.userRepository.findUserById(id);
    }

    async getUserByPhone(phone: string) {
        return this.userRepository.findUserByPhone(phone);
    }

    async createUser(userData: CreateUserParams) {
        // Check if user with phone already exists
        const existingUser = await this.userRepository.findUserByPhone(userData.phone);
        if (existingUser) {
            throw new HttpException("User with this phone number already exists", HttpStatus.CONFLICT);
        }

        // Hash password
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(userData.password, saltRounds);

        // Create user
        const newUser = await this.userRepository.createUser({
            name: userData.name,
            userType: userData.userType,
            status: 'ACTIVE',
            passwordHash: passwordHash,
            autoDialerId: userData.autoDialerId || '',
            roles: userData.roles || [],
            lastLoginIdentity: new Types.ObjectId(), // Placeholder, will be updated on first login
            isActive: true,
            userContacts: [
                {
                    phoneNo: userData.phone,
                    email: userData.email || '',
                    isEmailVerified: false,
                    isPhoneVerified: false,
                    isPrimary: true,
                    isActive: true
                } as any
            ]
        });

        return {
            id: newUser._id.toString(),
            name: newUser.name,
            userType: newUser.userType,
            phone: newUser.userContacts[0].phoneNo,
            email: newUser.userContacts[0].email,
            status: newUser.status
        };
    }

    async verifyPassword(user: any, password: string): Promise<boolean> {
        return bcrypt.compare(password, user.passwordHash);
    }

    async updateUserLastLoginIdentity(userId: string, identityId: Types.ObjectId) {
        return this.userRepository.updateUser(userId, {
            lastLoginIdentity: identityId
        });
    }
}

type CreateUserParams = {
    name: string
    phone: string
    password: string
    userType: typeof UserTypes[keyof typeof UserTypes]
    email?: string
    autoDialerId?: string
    roles?: string[]
}

