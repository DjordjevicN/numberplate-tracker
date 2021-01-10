
const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const morgan = require("morgan")
const cors = require('cors')
const authUser = require('./routes/authUser')
const plates = require('./routes/plates')
const port = process.env.PORT || 3001
const db = require('./database')
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())
app.use("/uploads", express.static("uploads"))
app.use(fileUpload({
    createParentPath: true,
    // limits: { fileSize: 50 * 1024 * 1024 },
}))
require('dotenv').config()
app.use(morgan("dev"))
// Routes
app.use(authUser)
app.use(plates)


db.connect((err) => {
    if (err) {
        throw err
    }
    console.log('SQL CONNECTED WOOHOO');
});
app.get('/getStats', async (req, res) => {
    let sql = `SELECT * FROM plateglobal;`
    let query = db.query(sql, async (err, results) => {
        if (err) {
            res.json({ message: err, success: false });
            throw err
        };
        res.json({ message: '', success: true, results });
    })
})

// plateChecker
app.get('/plateChecker/:id', async (req, res) => {
    let sql = `SELECT * FROM plate INNER JOIN users ON  users.id = plate.owner_id AND plate.plateNumber = '${req.params.id}';`
    let query = db.query(sql, async (err, results) => {
        if (err) {
            res.json({ message: '', success: false });
            throw err
        };
        if (results.length > 0) {
            let plateOwnerEmail = results[0].email;
            let plateNumber = results[0].plateNumber;
            const sgMail = require('@sendgrid/mail')

            sgMail.setApiKey(process.env.SENDGRID_API_KEY)
            const msg = {
                to: `${plateOwnerEmail}`, // Change to your recipient
                from: 'notifications@izgubljene-tablice.nikola-djordjevic.com', // Change to your verified sender
                subject: `Tablica br:${plateNumber}`,
                text: 'and easy to do anywhere, even with Node.js',
                html: ` 
                <h1>Tablica br: ${plateNumber}</h1>
                <p>Neko je pronasao vasu tablicu</p>
                <p>idite na sajt www.izgubljene-tablice.com da vidite detalje.</p>`,
            }
            sgMail
                .send(msg)
                .then(() => {
                    console.log('Email sent')
                })
                .catch((error) => {
                    console.error(error)
                })
            res.json({ message: 'Ova tablica je oglasena kao izgubljena', success: true, results });
        }
    })
})
// ADD LOST PLATE COUNT
app.post('/addGlobalLost', async (req, res) => {
    let newTotal = req.body.value
    let sql = `UPDATE plateglobal SET 
    total_lost_plates = "${newTotal}" WHERE plateGlobal_id = 1
    `
    let query = await db.query(sql, (err, results) => {
        if (err) {
            res.json({ message: '', success: false });
            throw err
        };
        res.json({ message: '', success: true, results });
    })
})
// ADD found PLATE COUNT
app.post('/addGlobalFound', async (req, res) => {
    let newTotal = req.body.value
    let sql = `UPDATE plateglobal SET 
    total_found_plates = "${newTotal}" WHERE plateGlobal_id = 1
    `
    let query = await db.query(sql, (err, results) => {
        if (err) {
            res.json({ message: '', success: false });
            throw err
        };
        res.json({ message: '', success: true, results });
    })
})


app.listen(`${port}`, () => {
    console.log(`SERVER WORKING on ${port}`);
})








