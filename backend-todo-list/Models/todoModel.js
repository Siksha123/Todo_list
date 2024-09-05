// models/todoModel.js
const mongoose = require('mongoose');


const todoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    status: { type: String, default: "incomplete" }
  }, { timestamps: true,versionKey:false });

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
