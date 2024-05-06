const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const instanceSchema = new Schema({
  name: { type: String, required: true },
  host: { type: String, required: true },
  port: { type: Number, required: true },
  databases: [{ type: Schema.Types.ObjectId, ref: "Database" }],
  users: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

const Instance = mongoose.model("Instance", instanceSchema);

module.exports = Instance;
