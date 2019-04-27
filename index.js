require('@babel/register');
require('dotenv').config();
require('./lib/server').startServer(process.env.PORT);
