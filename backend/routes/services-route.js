const router = require("express").Router()
let Service = require("../models/service-model")

router.post("/", async (req, res) => {
  try{
    let { _author, mealCost, description } = req.body 

    if ( !_author, !mealCost, !description )
      return res.status(400).json({ msg: "Not all fields have been entered." })

    const service = new Service({
      _author,
      mealCost,
      description,
    })

    const savedService = await service.save()
    res.json(savedService)
  }catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router