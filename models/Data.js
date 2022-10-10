const mongoose = require("mongoose");

// Schema Design
const dataSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name for this product"],
      trim: true,
      unique: [true, "Name must be unique"],
      minLength: [3, "Name must be at least 3 charcters"],
      maxLength: [100, "Name is too large"],
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Price can't be negative"],
    },
    unit: {
      type: String,
      required: true,
      enum: {
        values: ["kg", "liter", "pcs"],
        message: "Unit value must be kg/liter/pcs",
      },
    },
    quantity: {
      type: Number,
      required: true,
      min: [0, "Quantity can't be negative"],
      validate: {
        validator: (value) => {
          const isInteger = Number.isInteger(value);
          if (isInteger) {
            return true;
          } else {
            return false;
          }
        },
      },
      message: "Quantity must be an integer",
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["in-stock", "out-of-stock", "discountinued"],
        message: "Status can't be {VALUE} ",
      },
    },
    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
    },
    categories: [
      {
        name: {
          type: String,
          required: true,
        },
        _id: mongoose.Schema.Types.ObjectId,
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Middleware
dataSchema.pre("save", function (next) {
  if (this.quantity == 0) {
    this.status = "out-of-stock";
  }
  next();
});

// Instance Methods
dataSchema.methods.logger = function () {
  console.log(`Data save for ${this.name}`);
};

// Model Create
const Data = mongoose.model("replace_by_collection_name", dataSchema);

module.exports = Data;
