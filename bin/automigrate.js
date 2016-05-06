var server = require('../server/server.js');
var ds = server.dataSources.localPsql;
var lbTables = ['Hubmapping'];
ds.automigrate(lbTables, function(er) {
  if (er) throw er;
  console.log('Loopback tables [' + lbTables + '] created in ', ds.adapter.name);
  ds.disconnect();
});

['Hubmapping', 'Source', 'Offreason', 'Canreason', 'Restaurant', 'Role', 'RoleMapping', 'ACL', 'AccessToken', 'Attendance', 'Orders', 'Cancelled', 'Offline', 'Enduser']