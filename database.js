const mysql = require('mysql')

// Database
module.exports = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '',
    database: 'lostplate'
})
// db.connect((err) => {
//     if (err) {
//         throw err
//     }
//     console.log('SQL CONNECTED');
// });
