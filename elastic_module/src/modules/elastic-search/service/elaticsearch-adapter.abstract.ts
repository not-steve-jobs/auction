import { Client } from '@elastic/elasticsearch';
import { Logger } from '@nestjs/common';
import { WriteResponseBase } from '@elastic/elasticsearch/lib/api/types';

export abstract class ElasticSearchAdapterAbstract<T> {
  protected abstract index: string;
  protected logger: Logger;

  protected constructor(protected readonly client: Client) {
    this.logger = new Logger('ElasticSearchAdapterAbstract');
  }

  async insertData(data: T, options: { id?: string } = {}): Promise<WriteResponseBase> {
    try {
      return await this.client.index({
        index: this.index,
        body: data,
        id: options?.id,
      });
    } catch (error) {
      this.logger.error(`insertData error: ${error}`);
    }
  }

  // searchPaginated(params: SearchRequest): Promise<SearchResponse<T>> {
  //   return this.client.search<T>(params);
  // }
}
