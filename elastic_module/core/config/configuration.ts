import * as process from 'process';

export interface ElasticSearchConfig {
  baseUrl: string;
  logIndex: string;
}

interface AppConfig {
  elasticSearch: ElasticSearchConfig;
}

const appConfig: AppConfig = {
  elasticSearch: {
    baseUrl: process.env.ELASTICSEARCH_BASE_URL || 'http://172.25.0.1:9200',
    logIndex: process.env.MIGRATION_LOG_INDEX || 'migration_log',
  },
};

export default (): AppConfig => appConfig;
