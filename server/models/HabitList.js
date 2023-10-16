// Import necessary modules
import { Schema, model } from "mongoose";

const habitSchema = new Schema({
  habitList: [
    {
      name: {
        type: String,
        required: true,
      },

      completed: {
        type: Boolean,
        default: false,
      },

      progress: {
        type: Number,
        min: 0,
        max: 30,
        default: 0,
      },

      createdAt: {
        type: Date,
        default: Date.now,
      },

      time:{
        hour:String,
        minute:String,
      }
      
    },
  ],
});

export default model("HabitList", habitSchema);
