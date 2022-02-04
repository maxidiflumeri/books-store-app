import {MigrationInterface, QueryRunner} from "typeorm";

export class fixCreatedAndUpdated1643929034468 implements MigrationInterface {
    name = 'fixCreatedAndUpdated1643929034468'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_details\` CHANGE \`birthday_date\` \`birthday_date\` timestamp NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_details\` CHANGE \`created_at\` \`created_at\` timestamp NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_details\` CHANGE \`updated_at\` \`updated_at\` timestamp NOT NULL`);
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
    }

}
