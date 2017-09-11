var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var { createEngine } = require('express-react-views');

const app = express();
const port = 8000;

app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.use(express.static('public'));
app.engine('jsx', createEngine());

app.get('/', routes.index);
app.get('/users', user.list);

app.listen(
	port,
	function(){
		console.log("\uD83C\uDF0F running at http://localhost:8000");
	}
);