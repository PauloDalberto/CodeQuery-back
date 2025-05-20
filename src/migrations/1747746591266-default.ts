import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1747746591266 implements MigrationInterface {
    name = 'Default1747746591266'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "repository_data" DROP CONSTRAINT "FK_094fff49e4f24b3a380ab349208"`);
        await queryRunner.query(`ALTER TABLE "repository_data" ADD CONSTRAINT "FK_094fff49e4f24b3a380ab349208" FOREIGN KEY ("conversationUuid") REFERENCES "conversation"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "repository_data" DROP CONSTRAINT "FK_094fff49e4f24b3a380ab349208"`);
        await queryRunner.query(`ALTER TABLE "repository_data" ADD CONSTRAINT "FK_094fff49e4f24b3a380ab349208" FOREIGN KEY ("conversationUuid") REFERENCES "conversation"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
