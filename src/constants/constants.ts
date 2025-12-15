const ROLES = {
    HUB_MANAGER: "HUB_MANAGER",
    DRIVER_MANAGER: "DRIVER_MANAGER",
    ADMIN: "ADMIN",
    VERIFICATION_AGENT: "VERIFICATION_AGENT",
    ONBOARDING_AGENT: "ONBOARDING_AGENT",
    TELECALLER: "TELECALLER",
    SENIOR_DRIVER_MANAGER: "SENIOR_DRIVER_MANAGER"
} as const;

const AppTypes = {
    PORTAL: "portal",
    DRIVER_APP: "driver_app"
} as const;

const UserTypes = {
    DRIVER: "DRIVER",
    OPS: "OPS"
}

const isActiveType = {
    ACTIVE: 1,
    INACTIVE: 0
} as const;

const ENV_FILE_PATH = '.env';

const JWT_TOKEN_TYPES = {
    GUEST: "guest",
    ACCESS: "access",
    REFRESH: "refresh"
} as const;

export { ROLES, AppTypes, UserTypes, isActiveType, ENV_FILE_PATH, JWT_TOKEN_TYPES };