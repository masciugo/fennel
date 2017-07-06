/*-----------------------------------------------------------------------------
 **
 ** - Fennel Card-/CalDAV -
 **
 ** Copyright 2015 by
 ** SwordLord - the coding crew - http://www.swordlord.com
 ** and contributing authors
 **
 ** This file is part of the test suite
 **
 ** This program is free software; you can redistribute it and/or modify it
 ** under the terms of the GNU General Public License as published by the Free
 ** Software Foundation, either version 3 of the License, or (at your option)
 ** any later version.
 **
 ** This program is distributed in the hope that it will be useful, but WITHOUT
 ** ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 ** FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for
 ** more details.
 **
 ** You should have received a copy of the GNU General Public License along
 ** with this program. If not, see <http://www.gnu.org/licenses/>.
 **
 **-----------------------------------------------------------------------------
 **
 ** Original Authors:
 ** LordEidi@swordlord.com
 ** LordLightningBolt@swordlord.com
 **
 ** $Id:
 **
 -----------------------------------------------------------------------------*/
var test = require('tape');
var request = require('request');

var config = require('../../config').config;

var username = config.test_user_name;
var password = config.test_user_pwd;
var faker = require('faker');

function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
}    

test('Calling PUT on cards', function (t) {

    t.plan(1);



setInterval(function(){
    let uid=generateUUID();
    let buid=generateUUID().replace('-','');
    let surname=faker.name.lastName();;
    let name=faker.name.firstName();;
    let cell= faker.phone.phoneNumber();
    payload  = `BEGIN:VCARD\n`;
    payload += `VERSION:3.0\n`;
    //payload += `PRODID:-//Apdfgdfgdfg.//dgdfgdfgdfg//EN\n`;
    payload += `FN:${name} ${surname}\n`;
    payload += `TEL;type=CELL;type=VOICE;type=pref:${cell}\n`;
    payload += `REV:2017-04-06T12:40:55Z\n`;
    payload += `FROMBXP:yes\n`;
    payload += `UID:${uid}\n`;
    payload += `END:VCARD\n`;
    var options = {
        method: 'PUT',
        uri: "http://localhost:80/card/" + username + "/default/"+uid+".vcf",
        auth: {
            'user': username,
            'pass': password,
            'sendImmediately': true
        } ,
        body: payload,
        followRedirect: false
    }

    request(options, function (error, response, body) {

        if (!error) {
            t.equal(response.statusCode, 201, "StatusCode matches");
        }
        else {
            t.fail(error);
        }
    });

}, 1000 * 10);


});
