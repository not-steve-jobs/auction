// NPM Modules
import knex from 'knex';
import bCrypt from 'bcryptjs';

// Local modules
import knexConfigs from '../../knex.configs';
import { LoggerUtil } from '../../src/utils';

async function insertUsers(pg) {
  await pg('users').insert([
    {
      id: 1,
      full_name: 'Super Admin',
      user_name: 'member@gmail.com',
      email: 'member@gmail.com',
      phone: '',
      status: 'active',
      password: bCrypt.hashSync('SuperAdmin', bCrypt.genSaltSync(10), null),
      google_id: bCrypt.hashSync('SuperAdmin', bCrypt.genSaltSync(10), null),
      created_at: new Date().toISOString()
    }, {
      id: 2,
      full_name: 'Super Admin',
      user_name: 'superadmni@gmail.com',
      email: 'superadmni@gmail.com',
      phone: '',
      status: 'active',
      password: bCrypt.hashSync('SuperAdmin', bCrypt.genSaltSync(10), null),
      google_id: bCrypt.hashSync('SuperAdmin', bCrypt.genSaltSync(10), null),
      created_at: new Date().toISOString()
    }
  ]);
}

function insertCategories(pg) {
  const categories = [
    {
      id: 1,
      name: 'Transport',
      status: 'active',
      image: '/diskStorage/serviceImageArchive/auctioin_project.png',
      created_at: new Date().toISOString()
    },
    {
      id: 2,
      name: 'Business services',
      status: 'active',
      image: '/diskStorage/serviceImageArchive/auctioin_project.png',
      created_at: new Date().toISOString()
    },
    {
      id: 3,
      name: 'Passenger transportation',
      parent: 1,
      main_id: 1,
      status: 'active',
      image: '/diskStorage/serviceImageArchive/auctioin_project.png',
      created_at: new Date().toISOString()
    },
    {
      id: 4,
      name: 'Cargo transportation',
      parent: 3,
      main_id: 1,
      status: 'active',
      image: '/diskStorage/serviceImageArchive/auctioin_project.png',
      created_at: new Date().toISOString()
    },
    {
      id: 5,
      name: 'Car rental',
      parent: 1,
      main_id: 1,
      status: 'active',
      image: '/diskStorage/serviceImageArchive/auctioin_project.png',
      created_at: new Date().toISOString()
    },
    {
      id: 6,
      name: 'Car service',
      parent: 1,
      main_id: 1,
      status: 'active',
      created_at: new Date().toISOString()
    },
    {
      id: 7,
      name: 'Finance and Accounting',
      parent: 2,
      main_id: 2,
      status: 'active',
      image: '/diskStorage/serviceImageArchive/auctioin_project.png',
      created_at: new Date().toISOString()
    },
    {
      id: 8,
      name: 'Legal services',
      parent: 7,
      main_id: 2,
      status: 'active',
      image: '/diskStorage/serviceImageArchive/auctioin_project.png',
      created_at: new Date().toISOString()
    },
    {
      id: 9,
      name: 'Translations and texts',
      parent: 8,
      main_id: 2,
      status: 'active',
      image: '/diskStorage/serviceImageArchive/auctioin_project.png',
      created_at: new Date().toISOString()
    },
    {
      id: 10,
      name: 'Education',
      status: 'active',
      parent: 9,
      main_id: 9,
      image: '/diskStorage/serviceImageArchive/auctioin_project.png',
      created_at: new Date().toISOString()
    },
    {
      id: 11,
      name: 'Beauty and health',
      status: 'active',
      parent: 10,
      main_id: 9,
      image: '/diskStorage/serviceImageArchive/auctioin_project.png',
      created_at: new Date().toISOString()
    },
    {
      id: 12,
      name: 'Events and holidays',
      status: 'active',
      parent: 9,
      main_id: 2,
      image: '/diskStorage/serviceImageArchive/auctioin_project.png',
      created_at: new Date().toISOString()
    },
    {
      id: 13,
      name: 'Foreign Languages',
      parent: 10,
      main_id: 9,
      status: 'active',
      image: '/diskStorage/serviceImageArchive/auctioin_project.png',
      created_at: new Date().toISOString()
    },
    {
      id: 14,
      name: 'School and university subjects',
      parent: 11,
      main_id: 9,
      status: 'active',
      image: '/diskStorage/serviceImageArchive/auctioin_project.png',
      created_at: new Date().toISOString()
    }
  ];

  return pg('service_categories').insert(categories);
}

async function init() {
  try {
    const options = process.env.NODE_ENV === 'production'
      ? knexConfigs.production
      : knexConfigs.development;
    const pg = knex(options);
    await insertUsers(pg);
    await insertCategories(pg);
    LoggerUtil.info('Successfully inserted all data ... ');
    process.kill(process.pid);
  } catch (error) {
    console.error(error.message);
  }
}

init();
