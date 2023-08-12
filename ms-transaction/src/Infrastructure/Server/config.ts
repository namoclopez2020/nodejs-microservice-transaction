import * as dotenv from 'dotenv';

dotenv.config();

interface EnvConfig {
  PORT: string;
  DB_HOST: string;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_NAME: string;
  DB_PORT: number;
}

const envConfig: EnvConfig = {
  PORT: process.env.PORT || '3000',
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_USER: process.env.DB_USER || '',
  DB_PASSWORD: process.env.DB_PASSWORD || '',
  DB_NAME: process.env.DB_name || '',
  DB_PORT: Number(process.env.DB_PORT) || 5432
};

export default envConfig;