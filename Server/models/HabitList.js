import { Schema, model } from "mongoose";
const habitSchema = new Schema({
  habitList: [
      {
        type: Schema.Types.ObjectId,
        ref: "Habit",
      },
  ],
});
export default model("HabitList", habitSchema);





















