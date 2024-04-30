// NPM Modules
import knex from 'knex';
import bCrypt from 'bcryptjs';

// Local modules
import knexConfigs from '../../knex.configs';
import { LoggerUtil } from '../../src/utils';

async function insertUsers(pg) {
  await pg('users').insert([
    {
      full_name: 'superAdmin',
      user_name: '+37494691515',
      email: 'member@gmail.com',
      phone: '',
      status: 'esim',
      password: bCrypt.hashSync('Admin1234', bCrypt.genSaltSync(10), null),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
  ]);
}

function insertServiceCategories(pg) {
  const categories = [
    {
      id: 1,
      name: 'Transport',
      status: 'active',
      image: '/storage/serviceImageArchive/auction_project.png',
      created_at: new Date().toISOString()
    },
    {
      id: 2,
      name: 'Business services',
      status: 'active',
      image: '/storage/serviceImageArchive/auction_project.png',
      created_at: new Date().toISOString()
    },
    {
      id: 3,
      name: 'Passenger transportation',
      parent: 1,
      main_id: 1,
      status: 'active',
      image: '/storage/serviceImageArchive/auction_project.png',
      created_at: new Date().toISOString()
    },
    {
      id: 4,
      name: 'Cargo transportation',
      parent: 3,
      main_id: 1,
      status: 'active',
      image: '/storage/serviceImageArchive/auction_project.png',
      created_at: new Date().toISOString()
    },
    {
      id: 5,
      name: 'Car rental',
      parent: 1,
      main_id: 1,
      status: 'active',
      image: '/storage/serviceImageArchive/auction_project.png',
      created_at: new Date().toISOString()
    },
    {
      id: 6,
      name: 'Car service',
      parent: 1,
      main_id: 1,
      status: 'active',
      image: '/storage/serviceImageArchive/auction_project.png',
      created_at: new Date().toISOString()
    },
    {
      id: 7,
      name: 'Finance and Accounting',
      parent: 2,
      main_id: 2,
      status: 'active',
      image: '/storage/serviceImageArchive/auction_project.png',
      created_at: new Date().toISOString()
    },
    {
      id: 8,
      name: 'Legal services',
      parent: 7,
      main_id: 2,
      status: 'active',
      image: '/storage/serviceImageArchive/auction_project.png',
      created_at: new Date().toISOString()
    },
    {
      id: 9,
      name: 'Translations and texts',
      parent: 8,
      main_id: 2,
      status: 'active',
      image: '/storage/serviceImageArchive/auction_project.png',
      created_at: new Date().toISOString()
    },
    {
      id: 10,
      name: 'Education',
      status: 'active',
      parent: 9,
      main_id: 9,
      image: '/storage/serviceImageArchive/auction_project.png',
      created_at: new Date().toISOString()
    },
    {
      id: 11,
      name: 'Beauty and health',
      status: 'active',
      parent: 10,
      main_id: 9,
      image: '/storage/serviceImageArchive/auction_project.png',
      created_at: new Date().toISOString()
    },
    {
      id: 12,
      name: 'Events and holidays',
      status: 'active',
      parent: 9,
      main_id: 2,
      image: '/storage/serviceImageArchive/auction_project.png',
      created_at: new Date().toISOString()
    },
    {
      id: 13,
      name: 'Foreign Languages',
      parent: 10,
      main_id: 9,
      status: 'active',
      image: '/storage/serviceImageArchive/auction_project.png',
      created_at: new Date().toISOString()
    },
    {
      id: 14,
      name: 'School and university subjects',
      parent: 11,
      main_id: 9,
      status: 'active',
      image: '/storage/serviceImageArchive/auction_project.png',
      created_at: new Date().toISOString()
    }
  ];

  return pg('service_categories').insert(categories);
}

function insertCategories(pg) {
  const categories = [
    { id: 1, name: 'Marketplace', status: 'passive' },
    { id: 2, name: 'Electronics', status: 'active' },
    { id: 3, name: 'Phones', parent: 2, status: 'active' },
    { id: 4, name: 'Iphone', parent: 3, status: 'active' },
    { id: 5, name: 'Iphone 14', parent: 4, status: 'active' },
    { id: 6, name: 'Iphone 14 pro', parent: 5, status: 'active' },
    { id: 7, name: 'Iphone 14 pro 128', parent: 6, status: 'active' },
    { id: 8, name: 'Iphone 14 pro 256', parent: 6, status: 'active' },
    { id: 9, name: 'Iphone 14 pro 512', parent: 6, status: 'active' },
    { id: 10, name: 'Iphone 14 prom max', parent: 5, status: 'active' },
    { id: 11, name: 'Iphone 15', parent: 4, status: 'active' },
    { id: 12, name: 'Honor', parent: 3, status: 'active' },
    { id: 13, name: 'TV', parent: 2, status: 'active' },
    { id: 14, name: 'Samsung TV', parent: 4, status: 'active' }
  ];

  return pg('categories').insert(categories);
}

function insertCountries(pg) {
  const count = 1;
  const countries = ['Armenia'];
  const payload = countries.map((country) => ({
    id: count,
    name: country,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }));
  return pg('countries').insert(payload);
}

function insertRegions(pg) {
  let count = 1;
  const regions = [
    'Yerevan', 'Vayots Dzor', 'Tavush', 'Syunik', 'Shirak', 'Lori', 'Kotayk', 'Gegharkunik', 'Armavir', 'Ararat', 'Aragatsotn',
  ];
  const payload = regions.map((region) => ({
    id: count++,
    country_id: 1,
    name: region,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }));
  return pg('regions').insert(payload);
}

function insertCities(pg, regionId, cityNames, count) {
  const payload = cityNames.map((city) => ({
    id: count++,
    region_id: regionId,
    name: city,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }));
  return pg('cities').insert(payload);
}

function insertYerevan(pg) {
  const city_names = [ // Yerevan
    'Arabkir', 'Argavand', 'Jrashen', 'K’anak’erravan', 'Vardadzor', 'Yerevan'
  ];
  return insertCities(pg, 1, city_names, 1);
}

function insertVayotsDzor(pg) {
  const city_names = [ // Vayots Dzor Region
    'Agarakadzor', 'Aghavnadzor', 'Areni', 'Getap’', 'Gladzor', 'Jermuk', 'Malishka', 'Rrind', 'Shatin', 'Vayk’',
    'Vernashen', 'Yeghegis', 'Yeghegnadzor', 'Zarrit’ap’'
  ];
  return insertCities(pg, 2, city_names, 7);
}
function insertTavush(pg) {
  const city_names = [ // Tavush Region
    'Archis', 'Artsvaberd', 'Aygehovit', 'Azatamut', 'Bagratashen', 'Berd', 'Berdavan', 'Dilijan', 'Haghartsin', 'Ijevan',
    'Khasht’arrak', 'Mosesgegh', 'Navur', 'Noyemberyan', 'Parravak’ar', 'Sarigyugh', 'Voskevan'
  ];
  return insertCities(pg, 3, city_names, 21);
}

function insertSyunik(pg) {
  const city_names = [ // Syunik Province
    'Agarak', 'Akner', 'Angeghakot’', 'Brrnakot’', 'Dzorastan', 'Goris', 'Hats’avan', 'Kapan', 'Khndzoresk', 'Meghri',
    'Shaghat', 'Shinuhayr', 'Tegh', 'Verishen'
  ];
  return insertCities(pg, 4, city_names, 38);
}

function insertShirak(pg) {
  const city_names = [ // Shirak Region
    'Akhuryan', 'Amasia', 'Anushavan', 'Arevik', 'Arevshat', 'Arrap’i', 'Azatan', 'Basen', 'Dzit’hank’ov', 'Gyumri',
    'Haykavan', 'Horrom', 'Kamo', 'Lerrnakert', 'Maralik', 'Marmashen', 'Mayisyan', 'Meghrashen', 'Mets Mant’ash',
    'P’ok’r Mant’ash', 'Pemzashen', 'Saratak', 'Shirak', 'Spandaryan', 'Voskehask', 'Yerazgavors'
  ];
  return insertCities(pg, 5, city_names, 52);
}

function insertLori(pg) {
  const city_names = [ // Lori Region
    'Agarak', 'Akht’ala', 'Alaverdi', 'Arevashogh', 'Bazum', 'Chochkan', 'Darpas', 'Dsegh', 'Fioletovo', 'Gogaran',
    'Gugark’', 'Gyulagarak', 'Jrashen', 'Lerrnants’k’', 'Lerrnapat', 'Lerrnavan', 'Lorut', 'Margahovit', 'Mets Parni',
    'Metsavan', 'Norashen', 'Odzun', 'Sarahart’', 'Saramej', 'Shahumyan', 'Shirakamut', 'Shnogh', 'Spitak', 'Step’anavan',
    'Tashir', 'Tsaghkaber', 'Urrut', 'Vahagni', 'Vanadzor', 'Vardablur', 'Yeghegnut'
  ];
  return insertCities(pg, 6, city_names, 78);
}

function insertKotayk(pg) {
  const city_names = [ // Kotayk Region
    'Abovyan', 'Aghavnadzor', 'Akunk’', 'Aramus', 'Argel', 'Arzakan', 'Arzni', 'Balahovit', 'Bjni', 'Buzhakan', 'Byureghavan',
    'Dzoraghbyur', 'Fantan', 'Garrni', 'Goght’', 'Hrazdan', 'Kaputan', 'Kotayk’', 'Lerrnanist', 'Mayakovski', 'Meghradzor',
    'Mrgashen', 'Nor Geghi', 'Nor Gyugh', 'Prroshyan', 'Ptghni', 'Solak', 'Tsaghkadzor', 'Yeghvard', 'Zarr', 'Zoravan', 'Zovaber'
  ];
  return insertCities(pg, 7, city_names, 114);
}

function insertGegharkunik(pg) {
  const city_names = [ // Gegharkunik Province
    'Akunk’', 'Astghadzor', 'Chambarak', 'Ddmashen', 'Drakhtik', 'Dzoragyugh', 'Gagarin', 'Gandzak', 'Gavarr', 'Geghamasar',
    'Geghamavan', 'Karanlukh', 'Karchaghbyur', 'Lanjaghbyur', 'Lchap’', 'Lchashen', 'Lichk’', 'Madina', 'Martuni', 'Mets Masrik',
    'Nerk’in Getashen', 'Noratus', 'Sarukhan', 'Sevan', 'Tsovagyugh', 'Tsovak', 'Tsovasar', 'Tsovazard', 'Tsovinar', 'Vaghashen',
    'Vahan', 'Vardenik', 'Vardenis', 'Varser', 'Verin Getashen', 'Yeranos'
  ];
  return insertCities(pg, 8, city_names, 146);
}

function insertArmavir(pg) {
  const city_names = [ // Armavir Region
    'Aghavnatun', 'Aknalich', 'Aknashen', 'Alashkert', 'Apaga', 'Arak’s', 'Arazap’', 'Arbat’', 'Arevashat', 'Arevik', 'Argavand',
    'Armavir', 'Arshaluys', 'Artimet', 'Aygek', 'Aygeshat', 'Baghramyan', 'Bambakashat', 'Dalarik', 'Doghs', 'Gay', 'Geghakert',
    'Geghanist', 'Getashen', 'Gmbet’', 'Griboyedov', 'Haykashen', 'Hovtamej', 'Janfida', 'Khoronk’', 'Lenughi', 'Lukashin',
    'Margara', 'Mayisyan', 'Merdzavan', 'Metsamor', 'Mrgashat', 'Musalerr', 'Myasnikyan', 'Nalbandyan', 'Nor Armavir', 'Norakert',
    'P’shatavan', 'Ptghunk’', 'Sardarapat', 'Shenavan', 'Tandzut', 'Taronik', 'Tsaghkunk’', 'Tsiatsan', 'Vagharshapat',
    'Voskehat', 'Yeghegnut', 'Yeraskhahun'
  ];
  return insertCities(pg, 9, city_names, 182);
}

function insertArarat(pg) {
  const city_names = [ // Ararat Province
    'Aralez', 'Ararat', 'Arevabuyr', 'Arevshat', 'Armash', 'Artashat', 'Avshar', 'Aygavan', 'Aygepat', 'Aygestan', 'Aygezard',
    'Bardzrashen', 'Berk’anush', 'Burastan', 'Byuravan', 'Dalar', 'Darakert', 'Dashtavan', 'Dimitrov', 'Dvin', 'Getazat',
    'Ghukasavan', 'Goravan', 'Hayanist', 'Hovtashat', 'Hovtashen', 'Jrahovit', 'Lusarrat', 'Marmarashen', 'Masis', 'Mrganush',
    'Mrgavan', 'Mrgavet', 'Nizami', 'Norabats’', 'Noramarg', 'Norashen', 'Noyakert', 'Nshavan', 'Sayat’-Nova', 'Shahumyan',
    'Sis', 'Sisavan', 'Surenavan', 'Vedi', 'Verin Artashat', 'Verin Dvin', 'Vosketap’', 'Vostan', 'Yeghegnavan', 'Zangakatun',
    'Zorak'
  ];
  return insertCities(pg, 10, city_names, 236);
}

function insertAragatsotn(pg) {
  const city_names = [ // Aragatsotn Region
    'Agarakavan', 'Aparan', 'Aragats', 'Arteni', 'Ashnak', 'Ashtarak', 'Byurakan', 'Hnaberd', 'Karbi', 'Kasakh', 'Kosh',
    'Nor Yerznka', 'Oshakan', 'Sasunik', 'Shenavan', 'T’alin', 'Tsaghkahovit', 'Ushi', 'Voskevaz', 'Zovuni'
  ];
  return insertCities(pg, 11, city_names, 288);
}

async function insertPostalCodes(pg) {
  await pg('postal_codes').insert([
    {
      id: 1,
      code: 2502,
      city_id: 1,
      created_at: new Date().toISOString(),
    },
    {
      id: 2,
      code: 2501,
      city_id: 2,
      created_at: new Date().toISOString(),
    },
    {
      id: 3,
      code: 1901,
      city_id: 3,
      created_at: new Date().toISOString(),
    },
    {
      id: 4,
      code: 2510,
      city_id: 4,
      created_at: new Date().toISOString(),
    },
    {
      id: 5,
      code: 2555,
      city_id: 5,
      created_at: new Date().toISOString(),
    },
    {
      id: 6,
      code: 2777,
      city_id: 6,
      created_at: new Date().toISOString(),
    },
    {
      id: 7,
      code: 1999,
      city_id: 7,
      created_at: new Date().toISOString(),
    },
    {
      id: 8,
      code: 2599,
      city_id: 8,
      created_at: new Date().toISOString(),
    },
    {
      id: 9,
      code: 2577,
      city_id: 9,
      created_at: new Date().toISOString(),
    },
    {
      id: 10,
      code: 2555,
      city_id: 10,
      created_at: new Date().toISOString(),
    },
    {
      id: 11,
      code: 1888,
      city_id: 11,
      created_at: new Date().toISOString(),
    },
    {
      id: 12,
      code: 2533,
      city_id: 12,
      created_at: new Date().toISOString(),
    },
    {
      id: 13,
      code: 2522,
      city_id: 13,
      created_at: new Date().toISOString(),
    },
    {
      id: 14,
      code: 2511,
      city_id: 14,
      created_at: new Date().toISOString(),
    },
    {
      id: 15,
      code: 1989,
      city_id: 15,
      created_at: new Date().toISOString(),
    },
    {
      id: 16,
      code: 2521,
      city_id: 16,
      created_at: new Date().toISOString(),
    },
  ]);
}

async function init() {
  try {
    const options = process.env.NODE_ENV === 'production'
      ? knexConfigs.production
      : knexConfigs.development;
    const pg = knex(options);
    await insertUsers(pg);
    await insertServiceCategories(pg);
    await insertCategories(pg);
    await insertCountries(pg);
    await insertRegions(pg);
    await insertYerevan(pg);
    await insertVayotsDzor(pg);
    await insertTavush(pg);
    await insertSyunik(pg);
    await insertShirak(pg);
    await insertLori(pg);
    await insertKotayk(pg);
    await insertGegharkunik(pg);
    await insertArmavir(pg);
    await insertArarat(pg);
    await insertAragatsotn(pg);
    await insertPostalCodes(pg);

    LoggerUtil.info('Successfully inserted all PRODUCT!!! data ... ');
    process.kill(process.pid);
  } catch (error) {
    console.error(error.message);
  }
}

init();
