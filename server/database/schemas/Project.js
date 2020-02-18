const mongoose = require('mongoose');
const { MongooseAutoIncrementID } = require('mongoose-auto-increment-reworked');
const immutablePlugin = require('mongoose-immutable');

const { Schema } = mongoose;

const projectSchema = new Schema({
  project: { type: String, lowercase: true, required: true, unique: true, immutable: true },
  company_logo: { type: String },
  created_at: { type: Date, default: Date.now, immutable: true },
  updated_at: { type: Date },
});

MongooseAutoIncrementID.initialise('counters');

projectSchema.plugin(MongooseAutoIncrementID.plugin, {
  modelName: 'Project',
  field: 'project',
  incrementBy: 1,
  startAt: 1,
  unique: true,
  nextCount: false,
  resetCount: false,
});

projectSchema.plugin(immutablePlugin);

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
