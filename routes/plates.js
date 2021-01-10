
const express = require('express');
const router = express.Router();
const db = require('../database')

router.get('/allPlates', async (req, res) => {
    let sql = `SELECT * FROM plate ;`
    let query = db.query(sql, (err, results) => {
        if (err) {
            res.json({ message: '', success: false });
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
            res.json({ message: 'ERROR', success: false });
            throw err
        };
        res.json({ message: 'Uspesno oglasena tablica', success: true, results });
    })
})
// create found plate
router.post('/createFoundPlate', async (req, res) => {
    let { plateNumber, message, users_id, address, found, longitude,
        latitude } = req.body.value
    let sql = `INSERT INTO plate SET 
    plateNumber="${plateNumber}",
    address="${address}",
    found="${found}",
    longitude="${longitude}",
    latitude="${latitude}",
    message="${message}",
    users_id="${users_id}"`
    let query = await db.query(sql, (err, results) => {
        if (err) {
            res.json({ message: 'ERROR', success: false });
            throw err
        };
        res.json({ message: 'Uspesno oglasena tablica', success: true, results });
    })
})
router.post("/picture", async (req, res) => {
    try {
        if (!req.files) {
            res.send({
                status: false,
                message: "No files"
            })
        } else {
            const { picture } = req.files
            const id = req.body.newPlateAdded
            let randomNumber = Math.floor(Math.random() * Math.floor(10))
            let pictureName = `${randomNumber}${picture.name}`

            let sql = `UPDATE plate SET picture="${pictureName}" WHERE plate_id = ${id}`
            let query = db.query(sql, (err, results) => {
                if (err) {
                    res.send({ status: false, notification: 'Neuspesno' })
                    throw err
                };
                picture.mv("./uploads/" + pictureName)
                res.send({ status: true, results, notification: 'Slika promenjena' })
            })
        }
    } catch (e) {
        res.status(500).send(e)
    }
})
// update plate || plate found
router.post('/plateFound', (req, res) => {
    let { plateNumber } = req.body.value;
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
// Find plate by PlateNumber
router.get('/findNumberplate/:id', (req, res) => {
    let sql = `SELECT * FROM plate WHERE plateNumber = '${req.params.id}' AND found = 1;`
    let query = db.query(sql, (err, results) => {
        if (err) {
            res.json({ message: err, success: false });
            throw err
        };
        res.json({ message: 'Tablica je pornadjena', success: true, results });
    })
})
router.get('/getPlatesIPosted/:id', (req, res) => {
    let sql = `SELECT * FROM plate WHERE users_id = '${req.params.id}';`
    let query = db.query(sql, (err, results) => {
        if (err) {
            res.json({ message: err, success: false });
            throw err
        };
        res.json({ message: '', success: true, results });
    })
})

module.exports = router;
