const sqlite3 = require('sqlite3'); 
const path = require('path'); 
 
const databases = [ 
  { name: 'CAS', path: 'C:/Users/Patrick/Desktop/CAS/gse-inventory/gse_inventory.db' }, 
  { name: 'NIRO', path: 'C:/Users/Patrick/Desktop/NIRO/backend/gse_inventory.db' } 
]; 
 
function inspectDB(dbInfo) { 
  console.log(`\n${'='.repeat(60)}`); 
  console.log(`?? ${dbInfo.name} DATABASE`); 
  console.log(`${'='.repeat(60)}`); 
  console.log(`?? Path: ${dbInfo.path}\n`); 
  const db = new sqlite3.Database(dbInfo.path); 
 
  // Get all tables 
  db.all("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name", (err, tables) =
    if (err) { console.log('Error:', err.message); return; } 
    console.log('?? TABLES:'); 
    tables.forEach(t => console.log(`  - ${t.name}`)); 
  }); 
 
  // Get schema for parts table 
  db.get("SELECT sql FROM sqlite_master WHERE type='table' AND name='parts'", (err, row) =
    if (err) { console.log('Error:', err.message); return; } 
    console.log('\n?? PARTS TABLE SCHEMA:'); 
  }); 
 
  // Get foreign keys referencing parts 
  db.all(` 
    SELECT m.name as table_name, p."table" as parent, p."from" as fk_col, p.on_delete 
    FROM sqlite_master m 
    JOIN pragma_foreign_key_list(m.name) p 
    WHERE p."table" = 'parts' 
  `, (err, fks) =
    if (err) { console.log('Error:', err.message); return; } 
    console.log('\n?? FOREIGN KEYS REFERENCING PARTS:'); 
    if (fks.length === 0) { 
      console.log('  No foreign keys found'); 
    } else { 
      fks.forEach(fk =
      }); 
    } 
  }); 
 
  // Get row count from parts table 
  db.get("SELECT COUNT(*) as count FROM parts", (err, row) =
    if (err) { console.log('Error:', err.message); return; } 
  }); 
 
  // Close database after all queries 
  setTimeout(() => db.close(), 1000); 
} 
 
// Run inspection on both databases 
databases.forEach(inspectDB); 
 
console.log('\n?? Inspection started. Results will appear above...'); 
