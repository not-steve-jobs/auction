// NPM Modules
import { Model } from 'objection';

// Local Modules

class UsersModel extends Model {
  static get idColumn() {
    return 'id';
  }

  static get tableName() {
    return 'users';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
        id: { type: 'integer' },
        full_name: {
          type: 'string',
          minLength: 3,
          maxLength: 255
        },
        user_name: {
          type: 'string',
          minLength: 3,
          maxLength: 255
        },
        email: {
          type: 'string',
          minLength: 1,
          maxLength: 255
        },
        password: {
          type: 'string',
          minLength: 5,
          maxLength: 255
        },
        phone: {
          type: 'string',
          minLength: 5,
          maxLength: 255
        },
        status: {
          type: 'string',
          minLength: 3,
          maxLength: 255
        }
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

  $beforeDelete() {
    this.deleted_at = new Date();
  }

  // Methods
  static create(payload) {
    return UsersModel.query()
      .insert(payload)
      .returning('*');
  }

  static updatePasswordByUserName(user_name, newPassword) {
    return UsersModel.query()
      .patch({ password: newPassword })
      .where({ user_name })
      .returning('*')
      .first();
  }

  static findByUserName(user_name) {
    return UsersModel.query()
      .findOne({ user_name });
  }
}

export default UsersModel;
