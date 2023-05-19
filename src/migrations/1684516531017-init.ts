import { MigrationInterface, QueryRunner } from "typeorm";

export class init1684516531017 implements MigrationInterface {
    name = 'init1684516531017'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "email" character varying NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "offers" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "description" character varying NOT NULL, "userId" integer NOT NULL, "img" character varying NOT NULL, CONSTRAINT "PK_4c88e956195bba85977da21b8f4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "grades" ("id" SERIAL NOT NULL, "givenId" integer NOT NULL, "receivedId" integer NOT NULL, "grade" character varying NOT NULL, CONSTRAINT "PK_4740fb6f5df2505a48649f1687b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "offers" ADD CONSTRAINT "FK_dee629b1248f4ad48268faa9ea1" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "grades" ADD CONSTRAINT "FK_b8b659031d0e2f9abd6df9bb146" FOREIGN KEY ("givenId") REFERENCES "offers"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "grades" ADD CONSTRAINT "FK_548bebc6dba980617c5aa172b2a" FOREIGN KEY ("receivedId") REFERENCES "offers"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "grades" DROP CONSTRAINT "FK_548bebc6dba980617c5aa172b2a"`);
        await queryRunner.query(`ALTER TABLE "grades" DROP CONSTRAINT "FK_b8b659031d0e2f9abd6df9bb146"`);
        await queryRunner.query(`ALTER TABLE "offers" DROP CONSTRAINT "FK_dee629b1248f4ad48268faa9ea1"`);
        await queryRunner.query(`DROP TABLE "grades"`);
        await queryRunner.query(`DROP TABLE "offers"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
