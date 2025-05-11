import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1746796900785 implements MigrationInterface {
    name = 'Default1746796900785'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "conversation" ADD "repository" character varying`);
        await queryRunner.query(`ALTER TABLE "conversation" ADD "username" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "conversation" DROP COLUMN "username"`);
        await queryRunner.query(`ALTER TABLE "conversation" DROP COLUMN "repository"`);
    }

}
