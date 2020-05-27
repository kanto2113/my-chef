const router = require("express").Router()
let ChefProfile = require("../models/chef-profile-model")

// get chef profile

router.post("/", async (req, res) => {
  try {
    let { _author, locationCity, locationState, bio, profilePicture, services } = req.body

    const chefProfile = new ChefProfile({
      _author,
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

router.get("/:id", async (req, res) => {
  try {
    let chefProfileRes = await ChefProfile.findById(req.params.id).populate("services")
    console.log(chefProfileRes)
    res.send(chefProfileRes)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})


module.exports = router
