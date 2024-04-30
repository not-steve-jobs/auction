// NPM Modules
import { Model } from 'objection';
import { FileTypeEnum, ModuleEnum } from '../enum';
import { CryptoUtil } from '../utils';

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
        module: { type: 'string', enum: Object.values(ModuleEnum) },
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

  $afterInsert(queryContext) {
    if (this.id) this.id = CryptoUtil.encryptByKey(this.id);

    if (this.resource_id) this.resource_id = CryptoUtil.encryptByKey(this.resource_id);

    return super.$afterFind(queryContext);
  }

  // Methods

  static getByResourseId(id) {
    return FilesModel.query()
      .select('name')
      .where('resource_id', id);
  }

  static create(trx, payload) {
    return FilesModel.query(trx).insert(payload).returning(['resource_id', 'type', 'module', 'name', 'id']);
  }
}

export default FilesModel;
