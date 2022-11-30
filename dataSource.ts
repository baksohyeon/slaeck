import { DataSource } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();

const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: ['src/entities/*.entity{.ts,.js}'],
  migrations: ['./entities/*.entity{.ts,.js}'],
  charset: 'utf8mb4',
  synchronize: true,
  logging: true,
});

export default dataSource;
