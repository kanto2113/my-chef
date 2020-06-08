const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const fileUpload = require("express-fileupload")
const AWS = require("aws-sdk")
const router = express.Router()
const bodyParser = require("body-parser")
require("dotenv").config()


// set up express

const app = express()
app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`The server has started on port: ${PORT}.`))

// set up mongoose

mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}, (err) => {
    if (err) throw err
    console.log("MongoDB connection established.")
})

// set up file-upload

app.use(fileUpload())


// set up routes

app.use('/users', require('./routes/user-route'))
app.use('/services', require('./routes/services-route'))
app.use('/profile', require('./routes/profile-route'))

require("./routes/aws-route")(app)

// set up bodyParser

// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({extended: true}))


// set up aws-s3 bucket

AWS.config.getCredentials(function(err) {
  if (err) console.log(err.stack)
  else {
    console.log("aws-s3 Access key:", AWS.config.credentials.accessKeyId)
    console.log("aws-s3 Secret access key:", AWS.config.credentials.secretAccessKey)
  }
})