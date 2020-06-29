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
      zipCode,
      bio,
      profilePicture,
      services,
    } = req.body

    const Profile = new Profile({
      locationCity,
      locationState,
      zipCode,
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

// update Profile

router.patch("/update/:id", async (req, res) => {
  try {
    let id = req.params.id
    let updates = req.body
    const result = await Profile.findByIdAndUpdate(id, updates)
    res.send(result)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// update Profile.services by removing old service

router.post("/service_remove/:id", async (req, res) => {
  try {
    let id = req.params.id
    let updates = mongoose.Types.ObjectId(req.body.id)
    let profileRes = await Profile.findByIdAndUpdate(id, {
      $pull: { services: updates },
    })
    res.send(profileRes)
  } catch (err) {
    console.log("err", err)
    res.status(500).json({ error: err.message })
  }
})

module.exports = router