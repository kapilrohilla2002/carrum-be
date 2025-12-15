import { Module } from '@nestjs/common';
import { DatabaseModule } from './mongo/database.module';

@Module({
    imports: [DatabaseModule],
    exports: []
})
export class InfraModule { }
