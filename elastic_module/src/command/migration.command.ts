import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { MigrationService } from '@src/elastic-search/service/migration.service';

@Injectable()
export class MigrationCommand {
  constructor(private readonly migrationService: MigrationService) {}

  @Command({
    command: 'migration:up',
    describe: 'run migrations',
  })
  async create(): Promise<void> {
    await this.migrationService.runMigrations();
  }
}
