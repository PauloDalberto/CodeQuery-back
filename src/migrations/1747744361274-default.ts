import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1747744361274 implements MigrationInterface {
    name = 'Default1747744361274'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "repository_data" ("id" SERIAL NOT NULL, "filesContent" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "conversationUuid" character varying NOT NULL, CONSTRAINT "REL_094fff49e4f24b3a380ab34920" UNIQUE ("conversationUuid"), CONSTRAINT "PK_63b3a24edfa0183b481f6f40660" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "repository_data" ADD CONSTRAINT "FK_094fff49e4f24b3a380ab349208" FOREIGN KEY ("conversationUuid") REFERENCES "conversation"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "repository_data" DROP CONSTRAINT "FK_094fff49e4f24b3a380ab349208"`);
        await queryRunner.query(`DROP TABLE "repository_data"`);
    }

}
