const mongoose = require("mongoose")

db.createView(
  "chefCardView",
  "chefs",
  [
    { $lookup: { from: "chefprofiles", localField: "_id", foreignField: "_author"} }
  ],
  {},
)