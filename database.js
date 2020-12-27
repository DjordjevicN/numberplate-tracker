const mysql = require('mysql')
// Database
module.exports = mysql.createConnection({
    user: 'vrtirep_nikola',
    host: 'localhost',
    password: '&zL^dDMAt+NR',
    database: 'vrtirep_tablice'
})

// module.exports = mysql.createConnection({
//     user: 'root',
//     host: 'localhost',
//     password: '',
//     database: 'lostplates'
// })

