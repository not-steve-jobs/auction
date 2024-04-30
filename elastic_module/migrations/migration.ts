import { Migrations } from '@src/elastic-search/const';

export const migrations: Record<string, Migrations> = {
  '001': {
    version: '001',
    description: 'setup migration_log index',

    up: async (client: any) => {
      await client.indices.create({
        index: 'migration_log',
        mappings: {
          properties: {
            version: { type: 'keyword' },
            timestamp: { type: 'date' },
          },
        },
      });

      await client.index({
        index: 'migration_log',
        body: {
          version: '001',
          timestamp: new Date(),
        },
      });
    },

    down: async (client: any) => {
      await client.indices.delete({ index: 'migration_log' });
    },
  },

  '002': {
    version: '002',
    description: 'setup product index',

    up: async (client: any) => {
      await client.indices.create({
        index: 'product',
        mappings: {
          properties: {
            psql_id: { type: 'integer' },
            name: { type: 'keyword' },
            desc: { type: 'text' },
            creator_id: { type: 'integer' },
            category_id: { type: 'integer' },
            sale_type: { type: 'keyword' },
            extra_data: { type: 'keyword' },
            one_time_sale: { type: 'keyword' },
            status: { type: 'keyword' },
          },
        },
      });
    },

    down: async (client: any) => {
      await client.indices.delete({ index: 'product' });
    },
  },
};
