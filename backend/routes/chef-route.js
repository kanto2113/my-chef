const router = require("express").Router()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const auth = require("../middleware/chefAuth")
let Chef = require("../models/chef-model")
let ChefProfile = require("../models/chef-profile-model")
let Service = require("../models/service-model")
let mongoose = require("mongoose")


// register new chef

router.post("/register", async (req, res) => {
  try {
    let { firstName, lastName, email, password, passwordCheck } = req.body

    // validate

    if (!firstName || !lastName || !email || !password || !passwordCheck )
      return res.status(400).json({ msg: "Not all fields have been entered." })
    if (password.length < 5)
      return res.status(400).json({
        msg: "The password needs to be atleast 5 characters long.",
      })
    if (password !== passwordCheck)
      return res.status(400).json({
        msg: "Enter the same password twice for verification.",
      })

    const existingChef = await Chef.findOne({ email: email })
    if (existingChef)
      return res
        .status(400)
        .json({ msg: "Account with this email already exists" })

    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(password, salt)
    console.log(passwordHash)
    console.log(email)

    const newService = new Service({
      title: 'not set',
      description: 'not set',
      cost: 0,
    })

    console.log('before save service', newService)

    await newService.save()

    console.log('after save service', newService)

    const newServ = mongoose.Types.ObjectId(newService._id)

    console.log('newServ', newServ )

    const newChefProfile = new ChefProfile({
      locationCity: 'not set',
      locationState: 'not set',
      bio: 'not set',
      profilePicture: 'not set',
      services: [newServ],
    })

    console.log('before save', newChefProfile)
    try{
    await newChefProfile.save()
    }catch(err){console.log(err)}
    console.log('after save', newChefProfile)

    const newChef = new Chef({
      firstName,
      lastName,
      email,
      password: passwordHash,
      profile: newChefProfile._id
    })

    const savedChef = await newChef.save()
    console.log('savedChef', savedChef)
    res.send(savedChef)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// login to existing account

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body

    // validate

    if (!email || !password)
      return res.status(400).json({ msg: "Not all fields have been entered." })

    const chef = await Chef.findOne({ email: email })
    if (!chef)
      return res.status(400).json({
        msg: "No account with this email has been registered.",
      })

    const isMatch = await bcrypt.compare(password, chef.password)
    if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials" })

    const token = jwt.sign({ id: chef._id }, process.env.JWT_SECRET)
    res.json({
      token,
      chef: {
        id: chef._id,
        name: chef.firstName,
        email: chef.email,
      },
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// delete chef account

router.delete("/delete", auth, async (req, res) => {
  try {
    const deletedChef = await Chef.findByIdAndDelete(req.chef)
    res.json(deletedChef)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// verify web token

router.post("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("x-auth-token")
    if (!token) return res.json(false)

    const verified = jwt.verify(token, process.env.JWT_SECRET)
    if (!verified) return res.json(false)

    const chef = await Chef.findById(verified.id)
    if (!chef) return res.json(false)

    return res.json(true)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// get chef id, name, and services

router.get("/:id", async (req, res) => {
  try {
    let chefRes = await Chef.findById(req.params.id)
      .populate({
        path:"profile",
        populate: {
          path:"services",
          model: "service"
      }
    })
  res.send(chefRes)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
