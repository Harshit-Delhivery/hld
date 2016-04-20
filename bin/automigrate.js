var server = require('../server/server.js');
var ds = server.dataSources.localPsql;
var lbTables = ['Offreason'];
ds.automigrate(lbTables, function(er) {
  if (er) throw er;
  console.log('Loopback tables [' + lbTables + '] created in ', ds.adapter.name);
  ds.disconnect();
});

// ['Role', 'RoleMapping', 'ACL', 'AccessToken', 'Attendance', 'Orders', 'Cancelled', 'Offline', 'Enduser', 'Offreason', 'Canreason', 'Restaurant']