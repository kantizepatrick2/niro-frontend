const fs = require('fs'); 
const files = ['ChangePassword.js', 'GSEMaintenance.js', 'IssuePart.js', 'PendingApprovals.js', 'ReceivePart.js', 'Reports.js', 'Transactions.js']; 
files.forEach(file => { 
  const path = `src/components/${file}`; 
  let content = fs.readFileSync(path, 'utf8'); 
  content = content.replace(/https:\/\/gse-backend.onrender.com/g, 'https://niro-backend-695t.onrender.com'); 
  fs.writeFileSync(path, content, 'utf8'); 
  console.log(`Updated: ${file}`); 
}); 
console.log('Done! All files updated.'); 
