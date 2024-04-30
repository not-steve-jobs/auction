import { Inject, Injectable, Logger } from '@nestjs/common';
import { ElasticSearchAdapterAbstract } from '@src/elastic-search/service/elaticsearch-adapter.abstract';
import { Client } from '@elastic/elasticsearch';
import { ElasticClientTokens } from '@src/elastic-search/const';
import { ProductData } from '@src/elastic-search/interface';
import { WriteResponseBase } from '@elastic/elasticsearch/lib/api/types';

@Injectable()
export class ProductElasticService extends ElasticSearchAdapterAbstract<ProductData> {
  protected index = 'product';
  protected logger: Logger;

  constructor(@Inject(ElasticClientTokens.data) protected readonly elastic: Client) {
    super(elastic);
    this.logger = new Logger('elk');
  }

  indexProductData(data: ProductData): Promise<WriteResponseBase> {
    return this.insertData(data, { id: data.psql_id.toString() });
  }
}
