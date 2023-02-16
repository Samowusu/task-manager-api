const TaskDocument = require("../models/Task");
const asyncWrapper = require("../middlewares/async");
const { createCustomError } = require("../errors/customError");

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await TaskDocument.find({});
  res.status(200).json({ tasks });
});

const createTask = asyncWrapper(async (req, res) => {
  const task = await TaskDocument.create(req.body);
  res.status(201).json({ task });
});

const getTask = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const task = await TaskDocument.findById(id);
  if (!task) {
    return next(createCustomError(`No task with id : ${id}`, 404));
  }
  res.status(200).json({ task });
});

const updateTask = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const updatedTask = await TaskDocument.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!updatedTask) {
    return next(createCustomError(`No task with id : ${id}`, 404));
  }

  res.status(200).json({ task: updatedTask });
});

const deleteTask = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const task = await TaskDocument.findByIdAndDelete(id);
  if (!task) {
    return next(createCustomError(`No task with id : ${id}`, 404));
  }
  res.status(200).json({ task });
});

module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask };
