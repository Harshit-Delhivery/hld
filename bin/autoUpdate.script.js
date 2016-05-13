var server = require('../server/server.js');

var ds = server.dataSources.prod;
var lbTables = ['Attendance', 'Offline'];
ds.autoupdate(lbTables, function(er) {
  if (er) throw er;
  console.log('Loopback tables [' + lbTables + '] updated in ', ds.adapter.name);
  ds.disconnect();
});

['Hubmapping', 'Source', 'Offreason', 'Canreason', 'Restaurant', 'Role', 'RoleMapping', 'ACL', 'AccessToken', 'Attendance', 'Orders', 'Cancelled', 'Offline', 'Enduser']
