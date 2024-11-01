"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join((process.cwd(), ".env")) });
exports.default = {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    database_url: process.env.DATABASE_URL,
    bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
    jwt: {
        secret: process.env.JWT_SECRET,
        secret_expires_in: process.env.JWT_SECRET_EXPIRES_IN,
        refresh: process.env.JWT_REFRESH,
        refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
    },
    stripe: {
        secretKey: process.env.STRIPE_SECRET_KEY,
    },
};
