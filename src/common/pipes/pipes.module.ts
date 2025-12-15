import { Module } from "@nestjs/common";
import ZodValidationPipe from "./zodValidation.pipe";

@Module({
    imports: [],
    exports: [ZodValidationPipe]
})
export class PipesModule { }