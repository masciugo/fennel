/*-----------------------------------------------------------------------------
 **
 ** - Fennel Card-/CalDAV -
 **
 ** Copyright 2014-17 by
 ** SwordLord - the coding crew - http://www.swordlord.com
 ** and contributing authors
 **
 ** This program is free software; you can redistribute it and/or modify it
 ** under the terms of the GNU Affero General Public License as published by the
 ** Free Software Foundation, either version 3 of the License, or (at your
 ** option) any later version.
 **
 ** This program is distributed in the hope that it will be useful, but WITHOUT
 ** ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 ** FITNESS FOR A PARTICULAR PURPOSE.  See the GNU Affero General Public License for
 ** more details.
 **
 ** You should have received a copy of the GNU Affero General Public License
 ** along with this program. If not, see <http://www.gnu.org/licenses/>.
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

// Place all your configuration options here

var config =
{
    version_nr: '0.1.0',

    // Server specific configuration
    // Please use a proxy in front of Fennel to support TLS.
    // We suggest you use nginx as the TLS endpoint
    port: 8888,
    //port: 80,
    ip: '127.0.0.1',
    //ip: '0.0.0.0',

    // db specific configuration. you can use whatever sequelize supports.
    db_name: process.env.POSTGRES_DATABASE,
    db_uid: process.env.POSTGRES_USERNAME,
    db_pwd: process.env.POSTGRES_PASSWORD,
    db_dialect: 'postgres',
    db_logging: true,
    db_host: process.env.POSTGRES_HOST,
    db_port: process.env.POSTGRES_PORT,

    // Authentication
    // Authentication methods so far: courier, htaccess, ldap, uniquser
    auth_method: 'uniquser',
    uniquser_password: process.env.UNIQUSER_PASSWORD,
    // auth_method_courier_socket: '/var/run/courier/authdaemon/socket',
    // auth_method_htaccess_file: 'uniquser.htaccess',

    // ldap authentication requires the ldapjs@1.0.0 node module. Please install manually
    // auth_method_ldap_url: 'ldap://localhost:3002',
    // auth_method_ldap_user_base_dn: 'ou=users,dc=example',


    // Authorisation
    // Authorisation Rules:
    // This property takes an array of Shiro formatted strings. Users are
    // only permitted access to resources when said access is explicitly
    // allowed here. Please see http://shiro.apache.org/permissions.html
    // for a short introduction to Shiro Syntax.
    //
    // Fennel uses the URL + the function to check for authorisation.
    // /card/demo/default/card_id.vcf with method PUT will become
    // card:demo:default:card_id.vcf:put
    //
    // Please note that $username is not recognised by shiro-trie but
    // will be replaced by Fennel with the current user when loaded into
    // the current process.
    //
    // The current set will allow the owner to access his or her own stuff
    authorisation: [
        'cal:$username:*',
        'card:$username:*',
        'p:options,report,propfind',
        'p:$username:*'
    ],

    test_user_name: 'demo',
    test_user_pwd: 'demo',

};

// Exporting.
module.exports = {
    config: config
};
