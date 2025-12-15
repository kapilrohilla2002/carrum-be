import { Injectable } from "@nestjs/common"
import { DriverRepository } from "../repositories/driver.repository";
import { ROLES } from "src/constants/constants";

type CreateDriverParams = {
    userId: string;
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
    constructor(private readonly driverRepository: DriverRepository) { }

    async createDriver({ userId }: CreateDriverParams) {

        return {}
    }

    async createNewCarrumId(): Promise<string> {

        return ""
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
        return []
    }

    async getDriverById(id: string): Promise<any> {
        return {}
    }

    async updateDriver(id: string, driver: any): Promise<any> {
        return {}
    }

    async deleteDriver(id: string): Promise<any> {
        return {}
    }

}