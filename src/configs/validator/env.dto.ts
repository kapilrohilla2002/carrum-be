import z from "zod";

// Environment validation schema
export const envValidationSchema = z.object({
    // Server Configuration
    ENV: z.enum(['development', 'production', 'test', 'staging']).default('development'),
    PORT: z.coerce.number().int().positive().default(3000),


    MONGODB_URI: z.string().min(1, 'MONGODB_URI is required'),

    JWT_ACCESS_TOKEN_SECRET: z.string().min(1, 'JWT_ACCESS_TOKEN_SECRET is required'),
    JWT_REFRESH_TOKEN_SECRET: z.string().min(1, 'JWT_REFRESH_TOKEN_SECRET is required'),
    JWT_GUEST_TOKEN_SECRET: z.string().min(1, 'JWT_GUEST_TOKEN_SECRET is required'),

    AWS_REGION: z.string().min(1, 'AWS_REGION is required'),
    AWS_ACCESS_KEY: z.string().min(1, 'AWS_ACCESS_KEY is required'),
    AWS_SECRET_KEY: z.string().min(1, 'AWS_SECRET_KEY is required'),

    REDIS_ENABLED: z.boolean().default(false),
    REDIS_URL: z.string().min(1, 'REDIS_URL is required'),
    REDIS_PASSWORD: z.string().min(1, 'REDIS_PASSWORD is required'),
    DEFAULT_REDIS_TTL: z.coerce.number().int().positive().default(86400),
});

export type EnvConfig = z.infer<typeof envValidationSchema>;
