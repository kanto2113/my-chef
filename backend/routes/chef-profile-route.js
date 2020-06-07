const router = require("express").Router()
let User = require("../models/user-model")
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

// // get chef profile
// router.get("/:id", async (req, res) => {
//   try {
//     let chefProfileRes = await ChefProfile.findById(req.params.id).populate("services")
//     res.send(chefProfileRes)
//   } catch (err) {
//     res.status(500).json({ error: err.message })
//   }
// })

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


// update chefProfile._author with profile id

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
