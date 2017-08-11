'use strict';

const AWS = require('aws-sdk');
const kms = new AWS.KMS({accessKeyId: process.env.accessKeyId, secretAccessKey: process.env.secretAccessKey, region: process.env.region});

function encrypt(text) {
  return new Promise(function (fulfill, reject){
    kms.encrypt({ KeyId: process.env.KeyId, Plaintext: text }, function(err, data) {
      if (err) reject(err);
      else fulfill(data.CiphertextBlob.toString( "base64" ));
    });
  });
}

function decrypt(b64string) {
  return new Promise(function (fulfill, reject){
    kms.decrypt({CiphertextBlob: Buffer.from(b64string, 'base64')}, function(err, data) {
      if (err) reject(err);
      else fulfill(new Buffer(data.Plaintext, 'base64').toString('ascii'));
    });
  });
}

module.exports = { decrypt, encrypt };
