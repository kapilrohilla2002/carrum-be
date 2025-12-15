import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Driver } from "../schema/driver";

@Injectable()
export class DriverRepository {
    constructor(@InjectModel(Driver.name) private readonly driverModel: Model<Driver>) { }

    async createDriver(driver: Driver) {
        return this.driverModel.create(driver)
    }

    async getDrivers(): Promise<Driver[]> {
        return this.driverModel.find().lean()
    }

    async getDriverById(id: string): Promise<Driver | null> {
        const data = await this.driverModel.findById(id).lean()
        return data;
    }

    async updateDriver(id: string, driver: Driver): Promise<Driver | null> {
        const data = await this.driverModel.findByIdAndUpdate(id, driver).lean()
        return data;
    }

    async deleteDriver(id: string): Promise<Driver | null> {
        const data = await this.driverModel.findByIdAndDelete(id).lean()
        return data;
    }

    async getDriverByHubIdForDriverList(hubId: string) {
        const data = await this.driverModel.find({
            hubId: hubId,
        }).lean()

        return data;
    }
}


