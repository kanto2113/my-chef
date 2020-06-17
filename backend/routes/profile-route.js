const router = require("express").Router()
let User = require("../models/user-model")
let Profile = require("../models/profile-model")
const mongoose = require("mongoose")

// create profile

router.post("/", async (req, res) => {
  try {
    let {
      locationCity,
      locationState,
      bio,
      profilePicture,
      services,
    } = req.body

    const Profile = new Profile({
      locationCity,
      locationState,
      bio,
      profilePicture,
      services,
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
    let userRes = await User.findById(req.params.id).populate({
      path: "profile",
      populate: {
        path: "services",
        model: "service",
      },
    })
    res.send(userRes)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// update Profile.services with new service

router.post("/services/:id", async (req, res) => {
  try {
    let { _id } = req.body
    let profileRes = await Profile.findByIdAndUpdate(req.params.id).updateOne({
      $push: { services: req.body },
    })
    res.send(profileRes)
  } catch (err) {
    console.log("err", err)
    res.status(500).json({ error: err.message })
  }
})

// update Profile.services by removing old service

// router.post("/service_remove/:id", async (req, res) => {
//   try {
//     let profileRes = await Profile.findByIdAndUpdate(req.params.id).updateOne({
//       $pull: { services: req.params.id },
//     })
//     res.send(profileRes)
//   } catch (err) {
//     console.log("err", err)
//     res.status(500).json({ error: err.message })
//   }
// })

router.patch('/service_update/:id', async (req, res) => {
  try {
    await Profile.findByIdAndUpdate(req.params.id, req.body)
    await Profile.save()
    res.send(Profile)
  } catch (err) {
    res.status(500).send(err)
  }
})


module.exports = router

// update Profile._author with profile id
//
// router.post("/update/", async (req, res) => {
//   try{
//     let profile = {_author: mongoose.Types.ObjectId(req.body.profile._author)}
//     User.findByIdAndUpdate(mongoose.Types.ObjectId(req.body._id), {profile})
//     .then((result)=>{
//       res.send(result.data)
//     })
//   } catch (err) {
//     console.log('err', err)
//     res.status(500).json({ error: err.message })
//   }
// })
