import * as dotenv from 'dotenv';

dotenv.config();

interface EnvConfig {
  PORT: string;
  DB_HOST: string;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_NAME: string;
  DB_PORT: number;
  KAFKA_BROKER: string;
  KAFKA_USERNAME: string;
  KAFKA_PASSWORD: string;
}

const envConfig: EnvConfig = {
  PORT: process.env.PORT || '3000',
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_USER: process.env.DB_USER || '',
  DB_PASSWORD: process.env.DB_PASSWORD || '',
  DB_NAME: process.env.DB_name || '',
  DB_PORT: Number(process.env.DB_PORT) || 5432,
  KAFKA_BROKER: process.env.KAFKA_BROKER || '',
  KAFKA_USERNAME: process.env.KAFKA_USERNAME || '',
  KAFKA_PASSWORD: process.env.KAFKA_PASSWORD || ''
};

export default envConfig;