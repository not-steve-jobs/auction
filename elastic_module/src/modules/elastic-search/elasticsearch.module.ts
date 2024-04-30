import { DynamicModule, Global, Module, Provider, FactoryProvider } from '@nestjs/common';
import { ElasticSearchClientOptions } from './tokens';
import { Client } from '@elastic/elasticsearch';
import { ProductElasticService } from '@src/elastic-search/service/product-elastic.service';
import { MigrationService } from '@src/elastic-search/service/migration.service';
import { ProductController } from '@src/elastic-search/controller/product.controller';

@Global()
@Module({
  controllers: [ProductController],
  providers: [ProductElasticService, MigrationService],
})
export class ElasticSearchModule {
  static forRoot(
    optionsArray: Array<
      Pick<FactoryProvider<ElasticSearchClientOptions>, 'useFactory' | 'inject'> & { clientToken: string | symbol }
    >,
  ): DynamicModule {
    const providers: Provider[] = optionsArray.map((options) => ({
      provide: options.clientToken,
      useFactory: (...args): Client => {
        const settings = options.useFactory(...args);

        return new Client({
          node: settings['node'],
          requestTimeout: 60000, //1 minute
        });
      },
      inject: options.inject,
    }));

    return {
      exports: providers,
      providers,
      module: ElasticSearchModule,
    };
  }
}
