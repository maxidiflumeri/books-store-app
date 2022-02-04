import {MigrationInterface, QueryRunner} from "typeorm";

export class firstMigration1643928530955 implements MigrationInterface {
    name = 'firstMigration1643928530955'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user_details\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(50) NOT NULL, \`last_name\` varchar(50) NOT NULL, \`email\` varchar(50) NOT NULL, \`status\` varchar(8) NOT NULL DEFAULT 'ACTIVE', \`birthday_date\` timestamp NOT NULL, \`created_at\` timestamp NOT NULL, \`updated_at\` timestamp NOT NULL, UNIQUE INDEX \`IDX_34071c8003531ced970246523e\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(50) NOT NULL, \`password\` varchar(255) NOT NULL, \`status\` varchar(8) NOT NULL DEFAULT 'ACTIVE', \`created_at\` timestamp NOT NULL, \`updated_at\` timestamp NOT NULL, \`detail_id\` int NOT NULL, UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), UNIQUE INDEX \`REL_9fc134ca20766e165ad650ee74\` (\`detail_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`roles\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(20) NOT NULL, \`description\` varchar(255) NOT NULL, \`status\` varchar(8) NOT NULL DEFAULT 'ACTIVE', \`created_at\` timestamp NOT NULL, \`updated_at\` timestamp NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_roles\` (\`usersId\` int NOT NULL, \`rolesId\` int NOT NULL, INDEX \`IDX_99b019339f52c63ae615358738\` (\`usersId\`), INDEX \`IDX_13380e7efec83468d73fc37938\` (\`rolesId\`), PRIMARY KEY (\`usersId\`, \`rolesId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_9fc134ca20766e165ad650ee740\` FOREIGN KEY (\`detail_id\`) REFERENCES \`user_details\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_roles\` ADD CONSTRAINT \`FK_99b019339f52c63ae6153587380\` FOREIGN KEY (\`usersId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`user_roles\` ADD CONSTRAINT \`FK_13380e7efec83468d73fc37938e\` FOREIGN KEY (\`rolesId\`) REFERENCES \`roles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_roles\` DROP FOREIGN KEY \`FK_13380e7efec83468d73fc37938e\``);
        await queryRunner.query(`ALTER TABLE \`user_roles\` DROP FOREIGN KEY \`FK_99b019339f52c63ae6153587380\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_9fc134ca20766e165ad650ee740\``);
        await queryRunner.query(`DROP INDEX \`IDX_13380e7efec83468d73fc37938\` ON \`user_roles\``);
        await queryRunner.query(`DROP INDEX \`IDX_99b019339f52c63ae615358738\` ON \`user_roles\``);
        await queryRunner.query(`DROP TABLE \`user_roles\``);
        await queryRunner.query(`DROP TABLE \`roles\``);
        await queryRunner.query(`DROP INDEX \`REL_9fc134ca20766e165ad650ee74\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_34071c8003531ced970246523e\` ON \`user_details\``);
        await queryRunner.query(`DROP TABLE \`user_details\``);
    }

}
