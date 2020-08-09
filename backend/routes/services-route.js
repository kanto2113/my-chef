const router = require("express").Router()
let Service = require("../models/service-model")

// create new service

router.post("/", async (req, res) => {
  try {
    let { title, description, serviceType } = req.body

    const newService = new Service({
      title,
      description,
      serviceType,
    })
    const savedService = await newService.save()
    res.json(savedService)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// delete service and update profile.services array

router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedService = await Service.findByIdAndDelete(req.params.id)
    res.send(deletedService)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// get service

router.get("/:id", (req, res) => {
  Service.findById(req.params.id)
    .then((service)=> res.json(service))
    .catch((err)=> res.status(400).json("Error:" + err))
})


module.exports = router
