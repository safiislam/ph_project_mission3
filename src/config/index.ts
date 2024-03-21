import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), ".env") })


export default {
    NODE_ENV: process.env.NODE_ENV,
    port: process.env.PORT,
    datbase_url: process.env.DATABASE_URL,
    default_password: process.env.DEFAULT_PASS,
    bcrypt_saltRounds: process.env.BCRYPT_SALTROUNDS
}