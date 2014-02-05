var Memcached = require('memcached');

var servers = { '127.0.0.1:11211': 1,  '127.0.0.1:11212': 1};
var options = {};
var memcached = new Memcached(servers, options);

var logDetails = function(details){
	console.log(JSON.stringify(details, null, 4));
};
memcached.on('issue', logDetails);
memcached.on('failure', logDetails);
memcached.on('reconnecting', logDetails);
memcached.on('reconnected', logDetails);
memcached.on('remove', logDetails);

var logResult = function(operation, err){
	if(err){
		console.log(operation + " [fail]: " + err);
	}
	else{
		console.log(operation + " [success]");
	}
};
memcached.set('foo', 'bar', 50, function (err) {
	logResult('set', err);
	memcached.get('foo', function (err, data) {
		logResult('get', err);
		console.log(data);
		memcached.del('foo', function (err) {
			logResult('del', err);
		});
	});
});