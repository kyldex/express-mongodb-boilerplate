import mongoose from 'mongoose';

// Id field automatically generated by mongoose.
const thingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  userId: { type: String, required: true }
});

const Thing = mongoose.model('Thing', thingSchema);

export default Thing;
