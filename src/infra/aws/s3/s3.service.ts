import { S3Client } from "@aws-sdk/client-s3";
import { Injectable } from "@nestjs/common";
import AppConfigService from "src/configs/appConfig.service";

@Injectable()
export default class S3Service {
    private readonly s3Client: S3Client;
    constructor(appConfigService: AppConfigService) {
        this.s3Client = new S3Client({
            region: appConfigService.awsRegion,
            credentials: {
                accessKeyId: appConfigService.awsAccessKey,
                secretAccessKey: appConfigService.awsSecretKey
            }
        });
    }

    uploadFile(buffer: Buffer, path: string, contentType: string, bucket: string) { }

    downloadFile(url: string) { }
}