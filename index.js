
const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const morgan = require("morgan")
const cors = require('cors')
const authUser = require('./routes/authUser')
const plates = require('./routes/plates')
const port = process.env.PORT || 3001
const nodemailer = require('nodemailer')
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







// plateChecker
app.get('/plateChecker/:id', async (req, res) => {

    let sql = `SELECT * FROM plate INNER JOIN users ON  users.id = plate.owner_id AND plate.plateNumber = '${req.params.id}';`
    let query = db.query(sql, async (err, results) => {
        if (err) {
            res.json({ message: err, success: false });
            throw err
        };
        if (results.length > 0) {
            let plateOwnerEmail = results[0].email;
            let plateNumber = results[0].plateNumber;

            let output = `<p>Neko je pronasao tablicu broj: ${plateNumber}</p>
            <p>Idite na www.izgubljene-tablice.com i pogledajte poruku</p>
            `;
        }
        res.json({ message: '', success: true, results });






        // // async..await is not allowed in global scope, must use a wrapper
        // async function main() {
        //     // Generate test SMTP service account from ethereal.email
        //     // Only needed if you don't have a real mail account for testing


        //     // create reusable transporter object using the default SMTP transport
        //     let transporter = nodemailer.createTransport({
        //         name: "http://izgubljene-tablice.nikola-djordjevic.com",
        //         host: "mail.izgubljene-tablice.nikola-djordjevic.com",
        //         port: 587,
        //         secure: false, // true for 465, false for other ports
        //         auth: {
        //             user: 'notifications@izgubljene-tablice.nikola-djordjevic.com', // generated ethereal user
        //             pass: 'nikolica667', // generated ethereal password
        //         },
        //         tls: {
        //             rejectUnauthorized: false
        //         }
        //     });

        //     // send mail with defined transport object
        //     let info = await transporter.sendMail({
        //         from: '"Fred Foo 👻" <notifications@izgubljene-tablice.nikola-djordjevic.com>', // sender address
        //         to: "nikola.dj.87@gmail.com", // list of receivers
        //         subject: "Hello ✔", // Subject line
        //         text: "Hello world?", // plain text body
        //         html: "<b>Hello world?</b>", // html body
        //     });

        //     console.log("Message sent: %s", info.messageId);
        //     // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        //     // Preview only available when sending through an Ethereal account
        //     console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        //     // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        // }

        // main().catch(console.error);

    })
})










































app.listen(`${port}`, () => {
    console.log(`SERVER WORKING on ${port}`);
})








