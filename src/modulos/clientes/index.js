const db = require('../../DB/mysql.js');
const ctrl =  require('./controlador');


module.exports =ctrl(db);
