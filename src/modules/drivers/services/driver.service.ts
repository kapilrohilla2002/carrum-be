import { Injectable, HttpException, HttpStatus } from "@nestjs/common"
import { DriverRepository } from "../repositories/driver.repository";
import { ROLES } from "src/constants/constants";
import { Types } from "mongoose";
import { UtilService } from "src/utils/util.service";

type CreateDriverParams = {
    userId: string;
    hubId: string;
    createdBy: string;
    fileUploadId: string;
    schemeId?: string;
    parentDriverId?: string;
}

type GetHubManagerDriverListParams = {
    hubId: string;
}

type GetSeniorDriverManagerDriverListParams = {
    hubId: string;
}

type GetAdminDriverListParams = {
    hubId: string;
}

type GetVerificationAgentDriverListParams = {
    hubId: string;
}

type GetOnboardingAgentDriverListParams = {
    hubId: string;
}

type GetTelecallerDriverListParams = {
    hubId: string;
}

type GetDriverManagerDriverListParams = {
    hubId: string;
}

@Injectable()
export class DriverService {
    constructor(
        private readonly driverRepository: DriverRepository,
        private readonly utilService: UtilService
    ) { }

    async createDriver({ userId, hubId, createdBy, fileUploadId, schemeId, parentDriverId }: CreateDriverParams) {
        // Check if driver already exists for this user
        const existingDriver = await this.driverRepository.getDriverByUserId(userId);
        if (existingDriver) {
            throw new HttpException("Driver already exists for this user", HttpStatus.CONFLICT);
        }

        // Generate carrumId
        const carrumId = await this.utilService.generateCarrumId();

        // Create driver
        const driver = await this.driverRepository.createDriver({
            userId: new Types.ObjectId(userId),
            hubId: new Types.ObjectId(hubId),
            createdBy: new Types.ObjectId(createdBy),
            fileUploadId: new Types.ObjectId(fileUploadId),
            carrumId: carrumId,
            status: 'LEAD',
            schemeId: schemeId ? new Types.ObjectId(schemeId) : undefined,
            parentDriverId: parentDriverId ? new Types.ObjectId(parentDriverId) : undefined,
        } as any);

        return driver;
    }

    async createNewCarrumId(): Promise<string> {
        return this.utilService.generateCarrumId();
    }

    async getDriverListByRole(role: string, hubId: string): Promise<any[]> {
        let data = [];
        switch (role) {
            case ROLES.HUB_MANAGER: {
                data = await this.getHubManagerDriverList({ hubId: hubId })
                break;
            }
            case ROLES.DRIVER_MANAGER: {
                data = await this.getDriverManagerDriverList({ hubId: hubId })
                break;
            }
            case ROLES.SENIOR_DRIVER_MANAGER: {
                data = await this.getSeniorDriverManagerDriverList({ hubId: hubId })
                break;
            }
            case ROLES.ADMIN: {
                data = await this.getAdminDriverList({ hubId: hubId })
                break;
            }
            case ROLES.VERIFICATION_AGENT: {
                data = await this.getVerificationAgentDriverList({ hubId: hubId })
                break;
            }
            case ROLES.ONBOARDING_AGENT: {
                data = await this.getOnboardingAgentDriverList({ hubId: hubId })
                break;
            }
            case ROLES.TELECALLER: {
                data = await this.getTelecallerDriverList({ hubId: hubId })
                break;
            }
            default: {
                throw new Error("Invalid role")
            }
        }

        return data;
    }
    getSeniorDriverManagerDriverList({ hubId }: GetSeniorDriverManagerDriverListParams): Promise<any> {
        return this.driverRepository.getDriverByHubIdForDriverList(hubId)
    }
    getAdminDriverList({ hubId }: GetAdminDriverListParams): Promise<any> {
        return this.driverRepository.getDriverByHubIdForDriverList(hubId)
    }
    getVerificationAgentDriverList({ hubId }: GetVerificationAgentDriverListParams): Promise<any> {
        return this.driverRepository.getDriverByHubIdForDriverList(hubId)
    }
    getOnboardingAgentDriverList({ hubId }: GetOnboardingAgentDriverListParams): Promise<any> {
        return this.driverRepository.getDriverByHubIdForDriverList(hubId)
    }
    getTelecallerDriverList({ hubId }: GetTelecallerDriverListParams): Promise<any> {
        return this.driverRepository.getDriverByHubIdForDriverList(hubId)
    }
    getHubManagerDriverList({ hubId }: GetHubManagerDriverListParams): Promise<any> {
        return this.driverRepository.getDriverByHubIdForDriverList(hubId)
    }
    getDriverManagerDriverList({ hubId }: GetDriverManagerDriverListParams): Promise<any> {
        return this.driverRepository.getDriverByHubIdForDriverList(hubId)
    }


    async getDrivers(): Promise<any[]> {
        return this.driverRepository.getDrivers();
    }

    async getDriverById(id: string): Promise<any> {
        if (!Types.ObjectId.isValid(id)) {
            throw new HttpException("Invalid driver ID", HttpStatus.BAD_REQUEST);
        }
        const driver = await this.driverRepository.getDriverById(id);
        if (!driver) {
            throw new HttpException("Driver not found", HttpStatus.NOT_FOUND);
        }
        return driver;
    }

    async updateDriver(id: string, driver: any): Promise<any> {
        if (!Types.ObjectId.isValid(id)) {
            throw new HttpException("Invalid driver ID", HttpStatus.BAD_REQUEST);
        }
        const existingDriver = await this.driverRepository.getDriverById(id);
        if (!existingDriver) {
            throw new HttpException("Driver not found", HttpStatus.NOT_FOUND);
        }
        return this.driverRepository.updateDriver(id, driver);
    }

    async deleteDriver(id: string): Promise<any> {
        return {}
    }

}