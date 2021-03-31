const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  name: {
    type: String
  },
  description: {
    type: String
  },
  sets: {
    type: String
  },
  repetitions: {
    type: Number
  },
  completed: {
    type: Boolean
  }
});

module.exports = mongoose.model('Workout', workoutSchema);