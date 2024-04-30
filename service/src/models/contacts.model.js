// NPM Modules
import { Model } from 'objection';

// Local Modules

class ContactsModel extends Model {
  static get idColumn() { return 'id'; }

  static get tableName() { return 'contacts'; }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['service_id'], // Define the required fields
      properties: {
        id: { type: 'integer' },
        service_id: { type: 'integer' },
        contact_person: { type: 'string', maxLength: 100 },
        phones: { type: 'string' },
        emails: { type: 'string' },
        links: { type: 'string' },
      },
    };
  }

  $beforeInsert() {
    this.created_at = new Date();
  }

  $beforeUpdate() {
    this.updated_at = new Date();
  }

  // Methods
  static create(trx, payload) {
    return ContactsModel.query(trx).insert(payload).returning('*');
  }
}

export default ContactsModel;
