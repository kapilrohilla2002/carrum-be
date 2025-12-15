import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { DatabaseProvider } from './database.provider';

@Module({
    imports: [
        MongooseModule.forRootAsync({
            useFactory: (configService: ConfigService) => ({
                uri: configService.get<string>('MONGODB_URI'),
                retryWrites: true,
                w: 'majority',
                dbName: 'carrum',
            }),
            inject: [ConfigService],
        }),
    ],
    controllers: [],
    providers: [DatabaseProvider],
    exports: [MongooseModule],
})
export class DatabaseModule { }
