const router = require("express").Router()
let mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const auth = require("../middleware/userAuth")
let User = require("../models/user-model")
let Profile = require("../models/profile-model")
let Service = require("../models/service-model")


// register new user

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

    const existingUser = await User.findOne({ email: email })
    if (existingUser)
      return res
        .status(400)
        .json({ msg: "Account with this email already exists" })

    // encrypt password

    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(password, salt)

    // create user account

    const newService = new Service({
      title: 'not set',
      description: 'not set',
      cost: 0,
    })
    await newService.save()

    const newServ = mongoose.Types.ObjectId(newService._id)
    const newProfile = new Profile({
      locationCity: 'not set',
      locationState: 'not set',
      bio: 'not set',
      profilePicture: 'https://t4.ftcdn.net/jpg/00/64/67/63/240_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg',
      services: [newServ],
    })

    try{
      await newProfile.save()
    }catch(err){console.log(err)}

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      profile: newProfile._id
    })

    const savedUser = await newUser.save()
    console.log('savedUser', savedUser)
    res.send(savedUser)
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

    const user = await User.findOne({ email: email })
    if (!user)
      return res.status(400).json({
        msg: "No account with this email has been registered.",
      })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials" })

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
    res.json({
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName
      },
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})


// delete user account

router.delete("/delete", auth, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.user)
    res.json(deletedUser)
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

    const user = await User.findById(verified.id)
    if (!user) return res.json(false)

    return res.json(true)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})


// get user

router.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user)
  res.json({
      firstName: user.firstName,
      lastName: user.lastName,
      id: user._id,
  })
})

// get all users for cards

// services cost need to be filtered to one number of lowest cost

router.route('/cards').get((req, res) => {
  User.find()
    .select({firstName:1, lastName:1 })
    .populate({
      path:"profile",
      select: "bio profilePicture -_id",
      populate: {
        path:"services",
        model: "service",
        select: "cost -_id",
      }
    })
    .then(userCard => res.json(userCard))
    .catch(err => res.status(400).json('Error: '+ err))
})

module.exports = router
