const getAllJobs = async (req, res) => {
  res.send("Gets all the jobs");
};

const createJob = async (req, res) => {
  res.send("creates a new job");
};

const getJob = async (req, res) => {
  res.send("Gets one job");
};

const deleteJob = async (req, res) => {
  res.send("Deletes a job");
};

const updateJob = async (req, res) => {
  res.send("updates a job");
};

module.exports = {
  getAllJobs,
  getJob,
  deleteJob,
  updateJob,
  createJob,
};
