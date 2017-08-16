require('dotenv').config({path: '../.env'});
const etabeta = require('../libs/kms-encryption');

etabeta.encrypt('plain sample text').then(function(res) {
  console.log(res);
  etabeta.decrypt(res).then(function(res) {
    console.log(res);
  });
})


