'use strict';

const AWS = require('aws-sdk');
const kms = new AWS.KMS({accessKeyId: process.env.AWS_ACCESSKEYID, secretAccessKey: process.env.AWS_SECRETACCESSKEY, region: process.env.AWS_REGION});

function encrypt(text) {
  return new Promise(function (fulfill, reject){
    kms.encrypt({ KeyId: process.env.AWS_KEYID, Plaintext: text }, function(err, data) {
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
