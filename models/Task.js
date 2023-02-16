const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "must provide name"],
    maxlength: [20, "name cannot be more than 20 characters"],
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

//model could be referred to as 'collection' in the atlas DB
module.exports = mongoose.model("Task", TaskSchema);
