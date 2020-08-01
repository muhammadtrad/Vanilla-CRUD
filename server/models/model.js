/* eslint-disable no-console */
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://username:sOYtKTrK23AG6GBd@cluster0.j5gpu.mongodb.net/Cluster0?retryWrites=true&w=majority')
  .then(() => console.log('Sucessfully connected to MongoDB'))
  .catch((err) => console.log(err));

const { Schema } = mongoose;

const textModelSchema = new Schema({
  text: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
});


const Text = mongoose.model('text', textModelSchema);

module.exports = Text;
