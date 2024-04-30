export const ElasticClientTokens = {
  log: Symbol('log'),
  data: Symbol('data'),
};

export type Migrations = {
  version: string;
  description: string;
  up: (client: any) => Promise<void>;
  down: (client: any) => Promise<void>;
};
