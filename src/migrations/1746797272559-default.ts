// migration file (ex: 1746797272559-default.ts)
import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1746797272559 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "conversation" ADD "uuid" uuid DEFAULT uuid_generate_v4()`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "conversation" DROP COLUMN "uuid"`
    );
  }
}
