import { Channels } from 'src/entities/channels.entity';
import { Workspaces } from 'src/entities/workspaces.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export class CreateInitialData implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const workspacesRepository = dataSource.getRepository(Workspaces);
    await workspacesRepository.insert([
      {
        id: 1,
        name: 'Sleact',
        url: 'sleact',
      },
    ]);

    const channelsRepository = dataSource.getRepository(Channels);
    await channelsRepository.insert([
      {
        id: 1,
        name: '일반',
        WorkspaceId: 1,
        private: false,
      },
    ]);
    // await dataSource
    //   .createQueryBuilder()
    //   .insert()
    //   .into(Workspaces)
    //   .values([{ id: 1, name: 'Sleact', url: 'sleact' }])
    //   .execute();
    // await dataSource
    //   .createQueryBuilder()
    //   .insert()
    //   .into(Channels)
    //   .values([{ id: 1, name: '일반', WorkspaceId: 1, private: false }])
    //   .execute();
  }
}
