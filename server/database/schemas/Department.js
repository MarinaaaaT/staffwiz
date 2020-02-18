const mongoose = require('mongoose');
const { MongooseAutoIncrementID } = require('mongoose-auto-increment-reworked');
const immutablePlugin = require('mongoose-immutable');

const { Schema } = mongoose;

const departmentSchema = new Schema({
  department: { type: String, lowercase: true, required: true, unique: true, immutable: true },
  clevel_count: { type: Num },
  lead_count: { type: Num },
  director_count: { type: Num },
  senior_count: { type: Num },
  midlevel_count: { type: Num },
  junior_count: { type: Num },
  total_count: { type: Num },
  created_at: { type: Date, default: Date.now, immutable: true },
  updated_at: { type: Date },
});

MongooseAutoIncrementID.initialise('counters');

departmentSchema.plugin(MongooseAutoIncrementID.plugin, {
  modelName: 'Department',
  field: 'department',
  incrementBy: 1,
  startAt: 1,
  unique: true,
  nextCount: false,
  resetCount: false,
});

departmentSchema.plugin(immutablePlugin);

const Department = mongoose.model('Department', departmentSchema);

module.exports = Department;
