const router = require("express").Router()
const aws = require("aws-sdk")
const s3obj = new aws.S3({ params: { Bucket: "homecooked" } })
const uuidv1 = require("uuid/v1")

router.post("/chef-profile-picture", async (req, res) => {
  try {
    console.log(req.body.params.chefProfilePicture)
    let awsResponse = await s3obj.upload({
      Body: req.body,
      Key: "profile-picture",
    })
    res.send(awsResponse.data)
  } catch (err) {
    res.send(err)
    console.log(err)
  }
})

module.exports = router
