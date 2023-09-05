import mongoose from 'mongoose';

const { Schema } = mongoose; // Destructuring Schema from mongoose, it is used to define the data

// Create a schema as class instance of Mongoose's Schema
const Address = new Schema(
  {
    street: { type: String },
    number: { type: Number, min: 1, max: 100 },
    postcode: String,
  },
  {
    // Config object (second argument for new Schema constructor call)
    // This way you can configure a Mongoose schema
    //removes OjectIDs
    _id: false, // it disables the generation of ObjectIDs
    timestamps: true, // it generates the date of update or when file is modified
  }
);

export default Address;