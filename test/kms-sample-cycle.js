require('dotenv').config({path: '../.env'});
const AWS = require('aws-sdk');

console.log(process.env);

const kms = new AWS.KMS({accessKeyId: process.env.AWS_ACCESSKEYID, secretAccessKey: process.env.AWS_SECRETACCESSKEY, region: process.env.AWS_REGION});
var params = { KeyId: process.env.AWS_KEYID, Plaintext: 'plain sample text' }
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
