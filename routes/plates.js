
const express = require('express');
const router = express.Router();
const db = require('../database')

router.get('/allPlates', async (req, res) => {
    let sql = `SELECT * FROM plate ;`
    let query = db.query(sql, (err, results) => {
        if (err) {
            res.json({ message: err, success: false });
            throw err
        };
        res.json({ message: '', success: true, results });
    })
})

// create lost plate
router.post('/createLostPlate', async (req, res) => {
    let { plateNumber, message, owner_id } = req.body.value
    let sql = `INSERT INTO plate SET 
    plateNumber="${plateNumber}",
    message="${message}",
    owner_id="${owner_id}"`
    let query = await db.query(sql, (err, results) => {
        if (err) {
            res.json({ message: err, success: false });
            throw err
        };
        res.json({ message: 'Uspesno postavljena tablica', success: true, results });
    })
})
// create found plate
router.post('/createFoundPlate', async (req, res) => {
    let { plateNumber, message, users_id, address, found } = req.body.value
    let sql = `INSERT INTO plate SET 
    plateNumber="${plateNumber}",
    address="${address}",
    found="${found}",
    message="${message}",
    users_id="${users_id}"`
    let query = await db.query(sql, (err, results) => {
        if (err) {
            res.json({ message: err, success: false });
            throw err
        };
        res.json({ message: 'Uspesno postavljena tablica', success: true, results });
    })
})
// update plate || plate found
router.post('/plateFound', (req, res) => {
    let { plateNumber } = req.body.value;
    // set owner id
    // set claimed 1
    let sql = `UPDATE user SET 
    found = 1 
     WHERE plateNumber = ${plateNumber}`
    let query = db.query(sql, (err, results) => {
        if (err) {
            res.json({ message: err, success: false });
            throw err
        };
        res.json({ message: '', success: true });
    })
})
// update plate || plate claimed
router.post('/plateClaimed', (req, res) => {
    let { plateNumber } = req.body.value;
    let sql = `UPDATE user SET 
    claimed = 1
     WHERE plateNumber = ${plateNumber}`
    let query = db.query(sql, (err, results) => {
        if (err) {
            res.json({ message: err, success: false });
            throw err
        };
        res.json({ message: '', success: true });
    })
})
// activate plate 
// router.post('/plateActive', (req, res) => {
//     let { plateNumber } = req.body.value;
//     let sql = `UPDATE user SET 
//     active ='${true}'
//      WHERE plateNumber = ${plateNumber}`
//     let query = db.query(sql, (err, results) => {
//         if (err) {
//             res.json({ message: err, success: false });
//             throw err
//         };
//         res.json({ message: '', success: true });
//     })
// })
// deactivate plate 
// router.post('/deactivatePlate', (req, res) => {
//     let { plateNumber } = req.body.value;
//     let sql = `UPDATE user SET 
//     active ='${false}'
//      WHERE plateNumber = ${plateNumber}`
//     let query = db.query(sql, (err, results) => {
//         if (err) {
//             res.json({ message: err, success: false });
//             throw err
//         };
//         res.json({ message: '', success: true });
//     })
// })
// Find plate by PlateNumber
router.get('/findNumberplate/:id', (req, res) => {
    let sql = `SELECT * FROM plate WHERE plateNumber = '${req.params.id}';`
    let query = db.query(sql, (err, results) => {
        if (err) {
            res.json({ message: err, success: false });
            throw err
        };
        res.json({ message: '', success: true, results });
    })
})
// plateChecker
router.get('/plateChecker/:id', (req, res) => {
    let sql = `SELECT * FROM plate WHERE plateNumber = '${req.params.id}' and plate.found = 1;`
    let query = db.query(sql, (err, results) => {
        if (err) {
            res.json({ message: err, success: false });
            throw err
        };
        res.json({ message: '', success: true, results });
    })
})
// If found send Email to owner




module.exports = router;