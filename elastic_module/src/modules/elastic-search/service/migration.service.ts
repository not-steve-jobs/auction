import { Injectable, Logger } from '@nestjs/common';
import { Client } from '@elastic/elasticsearch';

import { migrations } from 'migrations/migration';
import { ConfigService } from '@nestjs/config';
import { ElasticSearchConfig } from 'core/config/configuration';

@Injectable()
export class MigrationService {
  private readonly logger = new Logger(MigrationService.name);
  private readonly client: Client;
  private migrationLogIndex = this.configService.get<ElasticSearchConfig>('elasticSearch').logIndex;

  constructor(private readonly configService: ConfigService) {
    this.client = new Client({ node: this.configService.get<ElasticSearchConfig>('elasticSearch').baseUrl });
  }

  async runMigrations(): Promise<any> {
    try {
      const migrationsEntries = Object.entries(migrations).sort((a: any, b: any) => Number(a[0]) - Number(b[0]));

      await this.indexExists(this.migrationLogIndex);

      const migrationLog = await this.client.search({
        index: this.migrationLogIndex,
      });

      const appliedMigrations = migrationLog.hits.hits.map((hit) => hit._source['version']);

      for (const [, migration] of migrationsEntries) {
        if (!appliedMigrations.includes(migration.version)) {
          this.logger.log(`Applying migration: ${migration.description}`);
          await migration.up(this.client);

          // Record the applied migration in the migration log
          await this.client.index({
            index: this.migrationLogIndex,
            body: {
              version: migration.version,
              timestamp: new Date(),
            },
          });
        }
      }
    } catch (e) {
      console.error(e, 6666);
    }
  }

  async rollbackMigrations(): Promise<void> {
    for (const migration of Object.values(migrations).reverse()) {
      this.logger.log(`Rolling back migration: ${migration.description}`);
      await migration.down(this.client);
    }
  }

  private async indexExists(indexName: string): Promise<void> {
    const indexExistsResult = await this.client.indices.exists({ index: indexName });

    if (!indexExistsResult) {
      await this.client.indices.create({
        index: this.migrationLogIndex,
        mappings: {
          properties: {
            version: { type: 'keyword' },
            timestamp: { type: 'date' },
          },
        },
      });
    }
  }
}
