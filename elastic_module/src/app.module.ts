import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ElasticSearchModule } from '@src/elastic-search/elasticsearch.module';
import configuration, { ElasticSearchConfig } from '../core/config/configuration';
import { ElasticClientTokens } from '@src/elastic-search/const';
import { CommandModule } from 'nestjs-command';
import { MigrationCommand } from './command/migration.command';
import { MigrationService } from '@src/elastic-search/service/migration.service';

const ELASTICSEARCH = [
  ElasticSearchModule.forRoot([
    {
      useFactory: (configService: ConfigService): { node: string } => ({
        node: configService.get<ElasticSearchConfig>('elasticSearch').baseUrl,
      }),
      inject: [ConfigService],
      clientToken: ElasticClientTokens.data,
    },
  ]),
];

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, load: [configuration] }), ...ELASTICSEARCH, CommandModule],
  controllers: [],
  providers: [MigrationCommand, MigrationService],
})
export class AppModule {}
