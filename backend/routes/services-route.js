const router = require("express").Router()
let Service = require("../models/service-model")

router.post("/", async (req, res) => {
  try{
    let { _author, title, description, cost } = req.body 

    const service = new Service({
      _author,
      title,
      description,
      cost,
    })
    const savedService = await service.save()
    res.json(savedService)
  }catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router