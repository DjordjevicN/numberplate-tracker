
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const saltRounds = 3;
const jwt = require('jsonwebtoken')
const auth = require('../auth')
const db = require('../database')



router.get('/getMyData', auth, (req, res) => {
    let id = req.user.user.id
    let sql = `SELECT * FROM users WHERE id = '${id}'`
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.send({ results, notification: '' })
    })
})




router.get('/users', async (req, res) => {
    let sql = `SELECT * FROM users;`
    let query = db.query(sql, (err, results) => {
        if (err) {
            res.json({ message: err, success: false });
            throw err
        };
        res.json({ message: '', success: true, results });
    })
})
// call base
// CREATE USER
router.post('/createUser', async (req, res) => {

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
router.post('/loginUser', (req, res) => {
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



module.exports = router;