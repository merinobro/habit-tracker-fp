import mongoose from 'mongoose';
import Address from './Address.js';

const { Schema, model } = mongoose;

const userSchema = new Schema(
  // Create a schema as class instance of Mongoose's Schema
  {
    /* username: String, */

    username: {
      type: String,

      default: 'john smith',
    },
    password: String,
    firstName: String,
    lastName: String,
    dateOfBirth: Date,

    email: { type: String, unique: true, required: true },
    telephone: String,
    usertype: {
      type: String,
      // a user can ONLY be 'admin', 'user', 'guest'
      // Enum makes sure that only certain options are allowed
      enum: ['admin', 'user', 'guest'], // We could remove admin --enum stands for enumeration
    },

    // You can nest data with an Object

    /*  homeAddress: {
      street: String,
      number: String,
      postcode: String,
    },
    workAddress: {
      street: String,
      number: String,
      postcode: String,
    }, */
    homeAddress: { type: Address },
    // workAddress: Address, // I think we could remove this, it is not really useful for our app

    /*
    hobbies: {               // We could remove also this one
      // You can also nest with an Array
      // type: Array,
      type: [String], // We want an array of Strings
      required: true,
    },
    */
  },
  {
    // Config object (second argument for new Schema constructor call)
    // This way you can configure a Mongoose schema
    timestamps: true, // automatically add timestamps
  }
);

//Convert the abstract schema into a model that can interact with our database
// mongoose. model (<modelNames, «schema>) const User model ('User', userSchema) ;
export default model('Users', userSchema);