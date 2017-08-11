require('dotenv').config();
console.log(process.version);
const AWS = require('aws-sdk');

const kms = new AWS.KMS({accessKeyId: process.env.accessKeyId, secretAccessKey: process.env.secretAccessKey, region: process.env.region});
var params = { KeyId: process.env.KeyId, Plaintext: 'ciccio pasticcio' }
kms.encrypt(params, function(err, data) {
  if (err) // an error occurred
    console.log(err, err.stack);
  else { // successful response
    text = data.CiphertextBlob.toString( "base64" )
    console.log(text); 
    kms.decrypt({CiphertextBlob: data.CiphertextBlob}, function(err, data) {
      if (err) // an error occurred
        console.log(err, err.stack);
      else { // successful response
        console.log(data);
        console.log(data.Plaintext.toString());
      }
    })
  }
});
