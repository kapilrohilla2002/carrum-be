import { Injectable, OnModuleInit, OnApplicationBootstrap, Logger } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { ConfigService } from '@nestjs/config';

const logger = new Logger('DatabaseProvider');

@Injectable()
export class DatabaseProvider implements OnModuleInit, OnApplicationBootstrap {
    private readonly mongodbUri: string;

    constructor(
        @InjectConnection() private readonly connection: Connection,
        private readonly configService: ConfigService,
    ) {
        this.mongodbUri = this.configService.get<string>('MONGODB_URI') ?? 'mongodb://localhost:27017/carrum';
    }

    async onModuleInit() {
        this.connection.on('error', (error) => {
            logger.error('MongoDB connection error:', error.message);
        });

        this.connection.on('connected', () => {
            logger.log(`MongoDB connected successfully to: ${this.mongodbUri}`);
            this.logRegisteredSchemas();
        });

        this.connection.on('disconnected', () => {
            logger.warn('MongoDB disconnected');
        });

        this.connection.on('reconnected', () => {
            logger.log('MongoDB reconnected');
            this.logRegisteredSchemas();
        });
    }

    async onApplicationBootstrap() {
        await new Promise(resolve => setTimeout(resolve, 1500));

        const states = {
            0: 'disconnected',
            1: 'connected',
            2: 'connecting',
            3: 'disconnecting',
        };

        const state = states[this.connection.readyState as keyof typeof states] || 'unknown';
        logger.log(`MongoDB connection state: ${state} (readyState: ${this.connection.readyState})`);

        if (this.connection.readyState !== 1) {
            logger.warn('MongoDB connection not ready. Please check your MongoDB server and connection string.');
        }

        // log registered schemas
        this.logRegisteredSchemas();
    }

    private logRegisteredSchemas() {
        const modelNames = Object.keys(this.connection.models);
        if (modelNames.length > 0) {
            logger.log(`Registered Mongoose schemas (${modelNames.length}):`);
            modelNames.forEach((modelName, index) => {
                const model = this.connection.models[modelName];
                const collectionName = model.collection.name;
                logger.log(`  ${index + 1}. ${modelName} -> Collection: ${collectionName}`);
            });

        } else {
            logger.warn('No Mongoose schemas registered with this connection.');
        }
    }
}

export const databaseProviders = DatabaseProvider;
