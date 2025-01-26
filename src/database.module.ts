import { TypeOrmModule } from "@nestjs/typeorm";

const entities = {
    "entities": ["./src/**/entities/*.ts"],
    // "migrations": ["./**/migration/*.ts"],
    // "subscribers": ["./**/subscriber/*.ts"]
}

export const databaseModule = TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'cronus',
    synchronize: true,
    ...entities
})
export const databaseTestModule = TypeOrmModule.forRoot({
    type: 'sqlite',
    database: 'test/db.sqlite',
    synchronize: true,
    dropSchema: true,
    migrationsRun: true,
    ...entities
})

