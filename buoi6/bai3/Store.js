const mongoose = require("mongoose");

const storeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    // Embedded Document: location lồng trực tiếp
    location: {
      street: {
        type: String,
        required: true,
      },
      district: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  },
);

const Store = mongoose.model("Store", storeSchema);

module.exports = Store;
