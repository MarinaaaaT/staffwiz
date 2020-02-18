const mongoose = require('mongoose');
const { MongooseAutoIncrementID } = require('mongoose-auto-increment-reworked');
const immutablePlugin = require('mongoose-immutable');

const { Schema } = mongoose;

const openingSchema = new Schema({
  opening: { type: String, lowercase: true, required: true, unique: true, immutable: true },
  project: { type: String },
  allocation: { type: Number, max: 100, min: 0 },
  user: { type: String},
  minlevel: { type: String},
  department: {type: String},
  startDate: {type: Date},
  endDate: {type: Date},
  created_at: { type: Date, default: Date.now, immutable: true },
  updated_at: { type: Date },
});

MongooseAutoIncrementID.initialise('counters');

openingSchema.plugin(MongooseAutoIncrementID.plugin, {
  modelName: 'Opening',
  field: 'opening',
  incrementBy: 1,
  startAt: 1,
  unique: true,
  nextCount: false,
  resetCount: false,
});

openingSchema.plugin(immutablePlugin);

const Opening = mongoose.model('Opening', openingSchema);

module.exports = Opening;
