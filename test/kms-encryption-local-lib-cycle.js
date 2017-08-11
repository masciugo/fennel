require('dotenv').config();
const etabeta = require('./libs/kms-encryption');


etabeta.encrypt('ciccio pasticcio').then(function(res) {
  console.log(res);
  etabeta.decrypt(res).then(function(res) {
    console.log(res);
  });
})


