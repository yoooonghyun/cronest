import { TestingModuleBuilder } from '@nestjs/testing';
import { Connection, EntityMetadata } from 'typeorm';
import { newDb } from 'pg-mem';
import * as R from 'ramda';
import { Models } from 'src/model/model.module';

export class TestDatabaseUtils {
  public static async overridePgMem(
    testBuilder: TestingModuleBuilder,
  ): Promise<TestingModuleBuilder> {
    const db = newDb();

    db.public.registerFunction({
      name: 'current_database',
      implementation: () => 'test',
    });

    const connection = await db.adapters.createTypeormConnection({
      type: 'postgres',
      entities: Models,
      synchronize: true,
    });

    return testBuilder.overrideProvider(Connection).useValue(connection);
  }

  public static async clearAllSchemas(getConnection: Connection) {
    const metadatas: EntityMetadata[] = getConnection.entityMetadatas;

    await Promise.all(
      R.map(async (m: EntityMetadata) => {
        await getConnection.getRepository(m.name).createQueryBuilder().delete().execute();
      }, metadatas),
    );
  }
}
