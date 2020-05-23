const aws = require("aws-sdk")
const s3obj = new aws.S3({ params: { Bucket: "HiredKnife" } })
const uuidv1 = require("uuid/v1")

module.exports = (app) => {

app.post("/api/chef-profile-picture", async (req, res) => {
  try {
    let awsResponse = await s3obj.upload({
      Body: req.files[0],
      Key: "profilepictures/" + uuidv1() +".png"
    })
    console.log(awsResponse)
    res.send(awsResponse.data)
  } catch (err) {
    res.send(err)
    console.log(err)
  }
})
}
// file successfully hitting route but not hitting aws

