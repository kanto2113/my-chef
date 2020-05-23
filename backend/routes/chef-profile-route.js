const router = require("express").Router()
let ChefProfile = require("../models/chef-profile-model")

// get chef profile

router.post("/", async (req, res) => {
  try {
    let { _author, bio, dateCreated } = req.body

    if ( !bio )
      return res.status(400).json({ msg: "Not all fields have been entered." })

    const chefProfile = new ChefProfile({
      _author,
      bio,
      dateCreated,
    })

    const savedChefProfile = await chefProfile.save()
    res.json(savedChefProfile)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.get("/:id", (req, res) => {
  ChefProfile.findById(req.params.id)
      .then(chefProfile => res.json(chefProfile))
      .catch(err => res.status(400).json('Error: ' + err))
})

module.exports = router
