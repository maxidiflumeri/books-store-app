import {MigrationInterface, QueryRunner} from "typeorm";

export class fixNameDetails1643929756600 implements MigrationInterface {
    name = 'fixNameDetails1643929756600'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_details\` CHANGE \`last_name\` \`last_name\` varchar(50) NULL`);
        await queryRunner.query(`ALTER TABLE \`user_details\` CHANGE \`email\` \`email\` varchar(50) NULL`);
        await queryRunner.query(`ALTER TABLE \`user_details\` CHANGE \`status\` \`status\` varchar(8) NULL DEFAULT 'ACTIVE'`);
        await queryRunner.query(`ALTER TABLE \`user_details\` CHANGE \`birthday_date\` \`birthday_date\` timestamp NULL`);
        await queryRunner.query(`ALTER TABLE \`user_details\` CHANGE \`created_at\` \`created_at\` timestamp NULL`);
        await queryRunner.query(`ALTER TABLE \`user_details\` CHANGE \`updated_at\` \`updated_at\` timestamp NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`created_at\` \`created_at\` timestamp NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`updated_at\` \`updated_at\` timestamp NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`roles\` CHANGE \`created_at\` \`created_at\` timestamp NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`roles\` CHANGE \`updated_at\` \`updated_at\` timestamp NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`roles\` CHANGE \`updated_at\` \`updated_at\` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'`);
        await queryRunner.query(`ALTER TABLE \`roles\` CHANGE \`created_at\` \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`updated_at\` \`updated_at\` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`created_at\` \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`user_details\` CHANGE \`updated_at\` \`updated_at\` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'`);
        await queryRunner.query(`ALTER TABLE \`user_details\` CHANGE \`created_at\` \`created_at\` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'`);
        await queryRunner.query(`ALTER TABLE \`user_details\` CHANGE \`birthday_date\` \`birthday_date\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`user_details\` CHANGE \`status\` \`status\` varchar(8) NOT NULL DEFAULT 'ACTIVE'`);
        await queryRunner.query(`ALTER TABLE \`user_details\` CHANGE \`email\` \`email\` varchar(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_details\` CHANGE \`last_name\` \`last_name\` varchar(50) NOT NULL`);
    }

}
