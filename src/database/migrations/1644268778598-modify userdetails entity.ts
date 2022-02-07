import {MigrationInterface, QueryRunner} from "typeorm";

export class modifyUserdetailsEntity1644268778598 implements MigrationInterface {
    name = 'modifyUserdetailsEntity1644268778598'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_34071c8003531ced970246523e\` ON \`user_details\``);
        await queryRunner.query(`ALTER TABLE \`user_details\` DROP COLUMN \`email\``);
        await queryRunner.query(`ALTER TABLE \`user_details\` DROP COLUMN \`status\``);
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
        await queryRunner.query(`ALTER TABLE \`user_details\` ADD \`status\` varchar(8) NULL DEFAULT 'ACTIVE'`);
        await queryRunner.query(`ALTER TABLE \`user_details\` ADD \`email\` varchar(50) NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_34071c8003531ced970246523e\` ON \`user_details\` (\`email\`)`);
    }

}
