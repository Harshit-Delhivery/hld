var server = require('../server/server.js');
var ds = server.dataSources.localPsql;
var lbTables = ['Cancelled'];
ds.automigrate(lbTables, function(er) {
  if (er) throw er;
  console.log('Loopback tables [' + lbTables + '] created in ', ds.adapter.name);
  ds.disconnect();
});