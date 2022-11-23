const { Unauthorised, NotFound } = require("../errors");
const { StatusCodes } = require("http-status-codes");
const Job = require("../models/jobs");

const getAllJobs = async (req, res) => {
  const userId = req.user.userId;
  const jobs = await Job.find({ createdBy: userId }).sort("createdAt");
  res.status(StatusCodes.OK).json({ jobs, nbHits: jobs.length });
};

const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

const getJob = async (req, res) => {
  const userId = req.user.userId;
  const jobId = req.params.id;
  const job = await Job.findOne({ createdBy: userId, _id: jobId });
  if (!job) {
    throw new NotFound(`No such job found`);
  }
  res.status(StatusCodes.OK).json({ job });
};

const deleteJob = async (req, res) => {
  const userId = req.user.userId;
  const jobId = req.params.id;
  const job = await Job.findOneAndDelete({ createdBy: userId, _id: jobId });
  if (!job) {
    throw new NotFound(`No such job found`);
  }
  res.status(StatusCodes.OK).send("Success");
};

const updateJob = async (req, res) => {
  const userId = req.user.userId;
  const jobId = req.params.id;
  const job = await Job.findOneAndUpdate(
    { createdBy: userId, _id: jobId },
    req.body,
    {
      runValidators: true,
      new: true,
    }
  );
  if (!job) {
    throw new NotFound(`No such job found`);
  }
  res.status(StatusCodes.CREATED).json({ job });
};

module.exports = {
  getAllJobs,
  getJob,
  deleteJob,
  updateJob,
  createJob,
};
