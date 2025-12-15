import { PipeTransform, ArgumentMetadata } from '@nestjs/common';
import { ZodType } from 'zod';

export default class ZodValidationPipe implements PipeTransform {
    constructor(private schema: ZodType) { }

    transform(value: unknown, _metadata: ArgumentMetadata) {
        const parsedValue = this.schema.parse(value);
        return parsedValue;
    }
}
