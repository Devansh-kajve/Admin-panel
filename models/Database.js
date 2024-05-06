const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const databaseSchema = new Schema({
  name: { type: String, required: true },
  instanceId: { type: Schema.Types.ObjectId, ref: "Instance", required: true },
  // Add other database properties as needed
});

const Database = mongoose.model("Database", databaseSchema);

module.exports = Database;
