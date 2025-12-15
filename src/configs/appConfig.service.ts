import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { EnvConfig, envValidationSchema } from "./validator/env.dto";


@Injectable()
export default class AppConfigService implements OnModuleInit {
    private readonly envConfig: EnvConfig;


    constructor(private readonly configService: ConfigService) {
        let redisEnabled = this.configService.get("REDIS_ENABLED");
        if (redisEnabled) {
            redisEnabled = Boolean(redisEnabled);
        }

        const config = {
            PORT: this.configService.get('PORT'),
            MONGODB_URI: this.configService.get('MONGODB_URI'),
            JWT_ACCESS_TOKEN_SECRET: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
            JWT_REFRESH_TOKEN_SECRET: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
            JWT_GUEST_TOKEN_SECRET: this.configService.get('JWT_GUEST_TOKEN_SECRET'),
            AWS_REGION: this.configService.get("AWS_REGION"),
            AWS_ACCESS_KEY: this.configService.get("AWS_ACCESS_KEY"),
            AWS_SECRET_KEY: this.configService.get("AWS_SECRET_KEY"),
            REDIS_ENABLED: redisEnabled,
            REDIS_URL: this.configService.get("REDIS_URL"),
            REDIS_PASSWORD: this.configService.get("REDIS_PASSWORD"),
            DEFAULT_REDIS_TTL: this.configService.get("DEFAULT_REDIS_TTL"),
        };

        const result = envValidationSchema.safeParse(config);

        if (!result.success) {
            const errorMessages = result.error.issues.map(err =>
                `${err.path.join('.')}: ${err.message}`
            ).join('\n');
            throw new Error(`Environment validation failed:\n${errorMessages}`);
        }

        this.envConfig = result.data;
    }

    onModuleInit() {
        Logger.log("Environment configuration validated successfully");
    }

    // Getters for typed access to configuration
    get port(): number {
        return this.envConfig.PORT;
    }

    get mongodbUri(): string {
        return this.envConfig.MONGODB_URI;
    }

    get jwtAccessTokenSecret(): string {
        return this.envConfig.JWT_ACCESS_TOKEN_SECRET;
    }

    get jwtRefreshTokenSecret(): string {
        return this.envConfig.JWT_REFRESH_TOKEN_SECRET;
    }

    get jwtGuestTokenSecret(): string {
        return this.envConfig.JWT_GUEST_TOKEN_SECRET;
    }

    // Get all config as object
    get config(): EnvConfig {
        return { ...this.envConfig };
    }

    get awsRegion(): string {
        return this.envConfig.AWS_REGION;
    }

    get awsAccessKey(): string {
        return this.envConfig.AWS_ACCESS_KEY;
    }

    get awsSecretKey(): string {
        return this.envConfig.AWS_SECRET_KEY;
    }

    get redisEnabled(): boolean {
        return this.envConfig.REDIS_ENABLED;
    }

    get redisUrl(): string {
        return this.envConfig.REDIS_URL;
    }

    get redisPassword(): string {
        return this.envConfig.REDIS_PASSWORD;
    }
}