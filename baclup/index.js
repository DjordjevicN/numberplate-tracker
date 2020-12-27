
const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
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
app.get('/users', async (req, res) => {
    let sql = `SELECT * FROM users;`
    let query = db.query(sql, (err, results) => {
        if (err) {
            res.json({ message: err, success: false });
            throw err
        };
        res.json({ message: '', success: true, results });
    })
})
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
        }
        res.json({ message: 'Ova tablica je oglasena kao izgubljena', success: true, results });
    })
})



// CREATE USER
app.post('/createUser', async (req, res) => {

    let { ime, email, password } = req.body.value;
    let newPassword = await bcrypt.hash(password, saltRounds)
    let sql = `INSERT INTO users SET 
    userName="${ime}",
    email="${email}",
    password="${newPassword}"`
    let query = await db.query(sql, (err, results) => {
        if (err) {
            res.json({ message: 'Profil vec postoji', success: false });
            throw err
        };
        res.json({ message: 'Profil kreiran', success: true, results });
    })
})
// LOGIN USER
app.post('/loginUser', (req, res) => {
    const { email, password } = req.body.value
    let sql = `SELECT * FROM users WHERE email = '${email}'`
    let query = db.query(sql, async (err, results) => {
        if (err) {
            throw err
        } else if (results) {
            let match = await bcrypt.compare(password, results[0].password)
            if (match) {
                let user = {
                    email: results[0].email,
                    id: results[0].id
                }
                delete results[0].password;
                let token = jwt.sign({ user }, process.env.TOKEN_SECRET);
                res.json({ message: 'Dobrodosli', success: true, token, results });
            }
        }
    })
})




app.get('/allPlates', async (req, res) => {
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
app.post('/createLostPlate', async (req, res) => {
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
app.post('/createFoundPlate', async (req, res) => {

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
app.post("/picture", async (req, res) => {
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
app.post('/plateFound', (req, res) => {
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
app.post('/plateClaimed', (req, res) => {
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
app.get('/findNumberplate/:id', (req, res) => {
    let sql = `SELECT * FROM plate WHERE plateNumber = '${req.params.id}' AND found = 1;`
    let query = db.query(sql, (err, results) => {
        if (err) {
            res.json({ message: err, success: false });
            throw err
        };
        res.json({ message: 'Tablica je pornadjena', success: true, results });
    })
})
app.get('/getPlatesIPosted/:id', (req, res) => {
    let sql = `SELECT * FROM plate WHERE users_id = '${req.params.id}';`
    let query = db.query(sql, (err, results) => {
        if (err) {
            res.json({ message: err, success: false });
            throw err
        };
        res.json({ message: '', success: true, results });
    })
})























app.listen(`${port}`, () => {
    console.log(`SERVER WORKING on ${port}`);
})








