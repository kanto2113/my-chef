const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const AWS = require("aws-sdk")
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

// set up routes

app.use('/users', require('./routes/user-route'))
app.use('/chefs', require('./routes/chef-route'))
app.use('/api', require('./routes/aws-route'))

// set up aws-s3 bucket

AWS.config.getCredentials(function(err) {
  if (err) console.log(err.stack)
  else {
    console.log("Access key:", AWS.config.credentials.accessKeyId)
    console.log("Secret access key:", AWS.config.credentials.secretAccessKey)
  }
})