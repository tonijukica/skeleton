const crypto = require('crypto');
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
const contoller = require('./controllers');

const app = express();
const port = process.env.SERVER_PORT;
app.use(express.json({}));
app.use(cookieParser());
app.use(cookieSession({
	name: 'seesion',
  keys: [crypto.randomBytes(32).toString('hex')],
	maxAge: 24*60*60*1000
}));
app.use(cors({
	origin: '*',
	credentials: true
}));
app.use('/api', contoller);
app.use(express.static('dist'));

app.get('/', (req, res) => {
	res.send('Express server is up and running');
});


app.listen(port, () => {
	console.log(`Server up and running http://localhost:${port}`);
});
