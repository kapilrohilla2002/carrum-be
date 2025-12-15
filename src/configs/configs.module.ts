import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import AppConfigService from './appConfig.service';

@Global()
@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: ['.env.local', '.env'],
        }),
    ],
    controllers: [],
    providers: [AppConfigService],
    exports: [AppConfigService, ConfigModule],
})
export class ConfigsModule { }