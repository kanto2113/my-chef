const router = require("express").Router()
let Chef = require("../models/chef-model")
let ChefProfile = require("../models/chef-profile-model")
const mongoose = require("mongoose")


// create profile

router.post("/", async (req, res) => {
  try {
    let { locationCity, locationState, bio, profilePicture, services } = req.body

    const chefProfile = new ChefProfile({
      locationCity,
      locationState,
      bio,
      profilePicture,
      services
    })

    const savedChefProfile = await chefProfile.save()
    res.json(savedChefProfile)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// get chef profile

router.get("/:id", async (req, res) => {
  try {
    let chefProfileRes = await ChefProfile.findById(req.params.id).populate("services")
    console.log(chefProfileRes)
    res.send(chefProfileRes)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// update chef profile

router.post("/update/", async (req, res) => {
  console.log('req.body', req.body)
  try{
    let profile = {_author: mongoose.Types.ObjectId(req.body.profile._author)}
    console.log('profile', profile)
    Chef.findByIdAndUpdate(mongoose.Types.ObjectId(req.body._id), {profile})
    .then((result)=>{
      console.log('result', result)
      res.send(result.data)
    })
  } catch (err) {
    console.log('err', err)
    res.status(500).json({ error: err.message })
  }


})



module.exports = router
