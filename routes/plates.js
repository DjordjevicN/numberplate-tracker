
const express = require('express');
const router = express.Router();
const db = require('../database')
const nodemailer = require('nodemailer')

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
            let randomNumber = Math.floor(Math.random() * Math.floor(10000000000000000000))
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

// Find plate by PlateNumber
router.get('/findNumberplate/:id', (req, res) => {
    let sql = `SELECT * FROM plate WHERE plateNumber = '${req.params.id}' AND found = 1;`
    let query = db.query(sql, (err, results) => {
        if (err) {
            res.json({ message: err, success: false });
            throw err
        };
        res.json({ message: '', success: true, results });
    })
})
router.get('/getPlatesIPosted/:id', (req, res) => {
    let sql = `SELECT * FROM plate WHERE users_id = '${req.params.id}';`
    let query = db.query(sql, (err, results) => {
        if (err) {
            res.json({ message: err, success: false });
            throw err
        };
        console.log(results);
        res.json({ message: '', success: true, results });
    })
})


// **********************************************







module.exports = router;






 // create reusable transporter object using the default SMTP transport
//  let transporter = nodemailer.createTransport({
//     host: "mail.izgubljene-tablice.nikola-djordjevic.com",
//     port: 587,
//     secure: false, // true for 465, false for other ports
//     auth: {
//         user: 'notifications@izgubljene-tablice.nikola-djordjevic.com', // generated ethereal user
//         pass: 'nikolica667', // generated ethereal password
//     },
//     tls: {
//         rejectUnauthorized: false
//     }
// });

// // send mail with defined transport object
// let info = await transporter.sendMail({
//     from: '"Izgubljene-tablice.com" <notifications@izgubljene-tablice.nikola-djordjevic.com>', // sender address
//     to: "nikola.dj.87@gmail.com", // list of receivers
//     subject: "izgubljene-tablice", // Subject line
//     text: "Hello world?", // plain text body
//     html: output, // html body
// });

// console.log("Message sent: %s", info.messageId);
// console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));


// })