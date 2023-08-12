import { DataSource } from "typeorm"
import envConfig from "./config";
// import { User } from './entities/user.entity';
import { Transaction } from "./Infrastructure/Repositories/Entities/transaction.entity";

const myDataSource = new DataSource({
    type: "postgres",
    host: envConfig.DB_HOST,
    port: envConfig.DB_PORT,
    username: envConfig.DB_USER,
    password: envConfig.DB_PASSWORD,
    database: envConfig.DB_NAME,
    entities: [Transaction],
    logging: false,
    synchronize: true, //only por develop
})

export default myDataSource;