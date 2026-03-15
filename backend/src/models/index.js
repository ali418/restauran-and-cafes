const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';

// Load environment variables
require('dotenv').config({ path: path.join(__dirname, '../../../.env') });

// Database configuration
const useSSL = env === 'production' || process.env.DATABASE_SSL === 'true';

// Use DATABASE_URL if available, otherwise use individual config variables
const sequelize = process.env.DATABASE_URL 
  ? new Sequelize(process.env.DATABASE_URL, {
      dialect: 'postgres',
      protocol: 'postgres',
      dialectOptions: useSSL ? {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      } : {},
      logging: false,
      pool: {
        max: 20,
        min: 0,
        acquire: 60000,
        idle: 10000,
        evict: 1000
      }
    })
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      dialect: 'postgres',
      logging: false
    });

const db = {};

// Load models
fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js'
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// Ensure all models are loaded
const modelFiles = [
  'user.js',
  'product.js',
  'category.js',
  'inventory.js',
  'inventoryTransaction.js',
  'sale.js',
  'saleItem.js',
  'customer.js',
  'notification.js',
  'setting.js'
];

// Check if all required models are loaded
modelFiles.forEach(file => {
  const modelName = path.basename(file, '.js');
  // Convert to PascalCase for model name
  const pascalCaseModelName = modelName.charAt(0).toUpperCase() + modelName.slice(1);
  
  if (!db[pascalCaseModelName]) {
    console.warn(`Warning: Model ${pascalCaseModelName} not loaded. Check if the file exists and is properly defined.`);
  }
});

// Associate models
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Sync database models (create tables if they don't exist)
// In production on Railway, we use alter: true to ensure schema matches models
// First, fix any NULL timestamps that might prevent the ALTER from succeeding
const syncDatabase = async () => {
  try {
    console.log('🔄 Preparing database for synchronization...');
    
    // Check if users table exists first
    const [tableExists] = await sequelize.query(
      "SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'users');"
    );

    if (tableExists[0].exists) {
      const [results] = await sequelize.query('SELECT COUNT(*) as count FROM "users" WHERE "created_at" IS NULL;');
      const count = parseInt(results[0].count, 10);
      console.log(`🔍 [DB FIX] Found ${count} users with NULL created_at.`);
      
      if (count > 0) {
        console.log('🛠️  [DB FIX] Updating NULL timestamps for users...');
        const [updateResult] = await sequelize.query('UPDATE "users" SET "created_at" = NOW(), "updated_at" = NOW() WHERE "created_at" IS NULL;');
        console.log(`✅ [DB FIX] Update query executed.`);
      }
    }

    // Check if settings table exists
    const [settingsExists] = await sequelize.query(
      "SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'settings');"
    );

    if (settingsExists[0].exists) {
      const [results] = await sequelize.query('SELECT COUNT(*) as count FROM "settings" WHERE "created_at" IS NULL;');
      const count = parseInt(results[0].count, 10);
      console.log(`🔍 [DB FIX] Found ${count} settings with NULL created_at.`);
      
      if (count > 0) {
        console.log('🛠️  [DB FIX] Updating NULL timestamps for settings...');
        await sequelize.query('UPDATE "settings" SET "created_at" = NOW(), "updated_at" = NOW() WHERE "created_at" IS NULL;');
        console.log(`✅ [DB FIX] Settings timestamps updated.`);
      }
    }

    console.log('🔄 Synchronizing models with alter: true...');
    await sequelize.sync({ 
      force: false, 
      alter: true,
      logging: false // Disable SQL logging during sync to avoid flooding console
    });
    console.log('✅ Database synchronized.');
    
    // Get setting model via its name in db object
    const Setting = db.Setting;
    if (Setting) {
      const [setting, created] = await Setting.findOrCreate({
        where: { id: 1 },
        defaults: {
          store_name: 'Cafe Sundus',
          currency_code: 'UGX',
          currency_symbol: 'UGX',
          language: 'ar',
          tax_rate: 15,
          invoice_prefix: 'INV',
          invoice_next_number: 1001
        }
      });

      if (created) {
        console.log('🎉 Default settings created.');
      } else {
        console.log('ℹ️  Default settings already exist.');
      }
    }
  } catch (err) {
    console.error('❌ Sync failed:', err);
  }
};

db.syncDatabase = syncDatabase;
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;