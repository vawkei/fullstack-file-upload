const mongoose = require("mongoose");

const GameSchema = mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "Please fill in a title"],
    },
    consoles: {
      type: String,
      trim: true,
      required: [true, "Please fill in a console"],
    },
    image:{
      type:String,
      required:[true,"Please provide a link"]
    },
    publicId:{
      type:String,
      required:[true,"Please provide a link"]
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true }
);


module.exports = mongoose.model("games",GameSchema)