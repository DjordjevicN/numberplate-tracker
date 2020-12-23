
const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const morgan = require("morgan")
const cors = require('cors')
const authUser = require('./routes/authUser')
const plates = require('./routes/plates')
const port = process.env.PORT || 3001
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())
app.use("/uploads", express.static("uploads"))
app.use(fileUpload({
    createParentPath: true,
}))
require('dotenv').config()
app.use(morgan("dev"))
// Routes
app.use(authUser)
app.use(plates)

app.listen(`${port}`, () => {
    console.log(`SERVER WORKING on ${port}`);
})








