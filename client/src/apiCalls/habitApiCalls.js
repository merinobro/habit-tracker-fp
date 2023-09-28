import axios from "axios"

export const addHabit = async(habit)=>{
console.log("habit",habit)
const response = await axios.post('6502c333025e47fdfb447305')

console.log("res",response)
}

