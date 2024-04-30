// NPM Modules
import { Model } from 'objection';
import { FileTypeEnum } from '../enum';

// Local Modules

class FilesModel extends Model {
  static get idColumn() { return 'id'; }

  static get tableName() { return 'files'; }

  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
        id: { type: 'integer' },
        resource_id: { type: 'integer' },
        type: { type: 'string', enum: Object.values(FileTypeEnum) },
        url: { type: 'string' },
        module: { type: 'string' }, // table.enum('module', ['product']);
        name: { type: 'string' },
      }
    };
  }

  $formatJson(json) {
    json = super.$formatJson(json);
    delete json.password;
    return json;
  }

  $beforeInsert() {
    this.created_at = new Date();
  }

  $beforeUpdate() {
    this.updated_at = new Date();
  }

  // Methods
  static create(trx, payload) {
    return FilesModel.query(trx).insert(payload).returning('*');
  }
}

export default FilesModel;
