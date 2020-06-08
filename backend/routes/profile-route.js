const router = require("express").Router()
let User = require("../models/user-model")
let Profile = require("../models/profile-model")
const mongoose = require("mongoose")


// create profile

router.post("/", async (req, res) => {
  try {
    let { locationCity, locationState, bio, profilePicture, services } = req.body

    const Profile = new Profile({
      locationCity,
      locationState,
      bio,
      profilePicture,
      services
    })

    const savedProfile = await Profile.save()
    res.json(savedProfile)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})


// get user data, profile data, and services data

router.get("/:id", async (req, res) => {
  try {
    let userRes = await User.findById(req.params.id)
      .populate({
        path:"profile",
        populate: {
          path:"services",
          model: "service"
      }
    })
  res.send(userRes)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})


// update Profile._author with profile id

router.post("/update/", async (req, res) => {
  try{
    let profile = {_author: mongoose.Types.ObjectId(req.body.profile._author)}
    User.findByIdAndUpdate(mongoose.Types.ObjectId(req.body._id), {profile})
    .then((result)=>{
      res.send(result.data)
    })
  } catch (err) {
    console.log('err', err)
    res.status(500).json({ error: err.message })
  }
})



module.exports = router
