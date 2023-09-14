const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
      type: String,
      require: [true, "Title is Required"],
    },
    description: {
      type: String,
      required: [true, "Description is Required"],
    },
    image: {
      type: String,
      required: [true, "image is Required"],
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      require: [true, "User Id is Required"], //user model required for each made post
    },
  },
    { timestamps: true }
);
  


module.exports = mongoose.model('Post', postSchema);