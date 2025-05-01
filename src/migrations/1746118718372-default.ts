import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1746118718372 implements MigrationInterface {
    name = 'Default1746118718372'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "message" ("id" SERIAL NOT NULL, "role" character varying NOT NULL, "content" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "conversationId" integer, CONSTRAINT "PK_ba01f0a3e0123651915008bc578" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "conversation" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_864528ec4274360a40f66c29845" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_7cf4a4df1f2627f72bf6231635f" FOREIGN KEY ("conversationId") REFERENCES "conversation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "conversation" ADD CONSTRAINT "FK_c308b1cd542522bb66430fa860a" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "conversation" DROP CONSTRAINT "FK_c308b1cd542522bb66430fa860a"`);
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_7cf4a4df1f2627f72bf6231635f"`);
        await queryRunner.query(`DROP TABLE "conversation"`);
        await queryRunner.query(`DROP TABLE "message"`);
    }

}
