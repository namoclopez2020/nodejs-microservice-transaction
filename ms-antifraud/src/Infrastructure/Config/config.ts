import * as dotenv from 'dotenv';

dotenv.config();

interface EnvConfig {
  KAFKA_BROKER: string;
  KAFKA_USERNAME: string;
  KAFKA_PASSWORD: string;
}

const envConfig: EnvConfig = {
  KAFKA_BROKER: process.env.KAFKA_BROKER || '',
  KAFKA_USERNAME: process.env.KAFKA_USERNAME || '',
  KAFKA_PASSWORD: process.env.KAFKA_PASSWORD || ''
};

export default envConfig;