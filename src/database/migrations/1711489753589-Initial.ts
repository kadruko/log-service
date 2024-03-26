import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1711489753589 implements MigrationInterface {
    name = 'Initial1711489753589'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "voice" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying,
                "embedding" vector(256) NOT NULL,
                CONSTRAINT "PK_4dbff4827c3260aa4ffa68638f6" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "log" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "text" character varying,
                "timestamp" TIMESTAMP NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "voiceId" uuid,
                CONSTRAINT "PK_350604cbdf991d5930d9e618fbd" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "log"
            ADD CONSTRAINT "FK_68cf4d17ddba280136fbb0e4798" FOREIGN KEY ("voiceId") REFERENCES "voice"("id") ON DELETE
            SET NULL ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "log" DROP CONSTRAINT "FK_68cf4d17ddba280136fbb0e4798"
        `);
        await queryRunner.query(`
            DROP TABLE "log"
        `);
        await queryRunner.query(`
            DROP TABLE "voice"
        `);
    }

}
