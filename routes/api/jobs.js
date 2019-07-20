const express = require("express");
const router = express.Router();

const auth = require("../../middleware/auth");
const Job = require("../../models/Job");

const { check, validationResult } = require("express-validator");

// @route   GET api/jobs
// @desc    GET all jobs
// @access  Public
router.get("/", async (req, res) => {
  try {
    const job = await Job.find().select("-favorites -responses");
    res.json(job);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

// @route   GET api/jobs/mine
// @desc    GET all your posted jobs
// @access  Private
router.get("/mine", auth, async (req, res) => {
  try {
    const job = await Job.find({ user: req.user.id })
      .select("-favorites")
      .populate("responses.profile", "-friends ")
      .populate({
        path: "responses.profile",
        populate: { path: "user" }
      });

    res.json(job);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

// @route   GET api/jobs/:id
// @desc    GET all your posted jobs
// @access  Private
router.get("/:id", auth, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).select(
      "-favorites -responses"
    );
    res.json(job);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

// @route   POST api/jobs
// @desc    POST new job
// @access  Private
router.post(
  "/",
  [
    auth,
    [
      check("title", "Title of vacancy is requirement")
        .not()
        .isEmpty(),
      check("company", "Company of vacancy is requirement")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      company,
      title,
      location,
      salaryMin,
      salaryMax,
      description,
      reqs,
      special
    } = req.body;

    const jobsFields = {};
    jobsFields.user = req.user.id;
    if (company) jobsFields.company = company;
    if (title) jobsFields.title = title;
    if (location) jobsFields.location = location;
    if (salaryMin) jobsFields.salaryMin = salaryMin;
    if (salaryMax) jobsFields.salaryMax = salaryMax;
    if (description) jobsFields.description = description;
    if (reqs) jobsFields.reqs = reqs;
    if (special) jobsFields.special = special;

    const newJob = new Job({
      user: req.user.id,
      company: jobsFields.company,
      title: jobsFields.title,
      location: jobsFields.location,
      salaryMin: jobsFields.salaryMin,
      salaryMax: jobsFields.salaryMax,
      description: jobsFields.description,
      reqs: jobsFields.reqs,
      special: jobsFields.special
    });

    try {
      const job = await newJob.save();
      res.json(job);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: "Server error" });
    }
  }
);

// @route   PUT api/jobs/:id
// @desc    Update job by id
// @access  Private
router.put(
  "/:id",
  [
    auth,
    [
      check("title", "Title of vacancy is requirement")
        .not()
        .isEmpty(),
      check("company", "Company of vacancy is requirement")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const {
        company,
        title,
        location,
        salaryMin,
        salaryMax,
        description,
        reqs,
        special
      } = req.body;

      // check by null and authentication
      const job = await Job.findById(req.params.id);
      if (job === null) {
        return res
          .status(500)
          .json({ msg: "There is no vacancy with such id" });
      }
      if (req.user.id != job.user) {
        return res.status(500).json({ msg: "Access denied" });
      }

      if (company) job.company = company;
      if (title) job.title = title;
      if (location) job.location = location;
      if (salaryMin) job.salaryMin = salaryMin;
      if (salaryMax) job.salaryMax = salaryMax;
      if (description) job.description = description;
      if (reqs) job.reqs = reqs;
      if (special) job.special = special;

      await job.save();
      res.json(job);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: "Server error" });
    }
  }
);

// @route   DELETE api/jobs/:id
// @desc    DELETE job by id
// @access  Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (req.user.id != job.user) {
      return res.status(500).json({ msg: "Access denied" });
    }
    job.delete();
    res.json(job);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

// @route   PUT api/jobs/favorite/:id
// @desc    SET or UNSET favourite job to user
// @access  Private
router.put("/favorite/:id", auth, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    const user = await User.findById(req.user.id);

    let index = job.favorites.map(item => item._id).indexOf(user._id);
    if (index >= 0) {
      job.favorites.splice(index, 1);
    } else {
      job.favorites.push(user);
    }
    await job.save();
    res.json({ job: job._id, type: Boolean(index + 1) });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

// @route   GET api/jobs/favorite/get/
// @desc    GET favourite job to user
// @access  Private
router.get("/favorite/get/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const job = await Job.find({ favorites: user }).select("_id");

    res.json(job);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

// @route   PUT api/jobs/response/:id
// @desc    SET or UNSET responses
// @access  Private
router.put("/response/:id", auth, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    const profile = await Profile.findOne({ user: req.user.id }).select("_id");
    if (profile === null) {
      return res.status(500).json({ msg: "You should create profile first" });
    }

    if (req.user.id == job.user) {
      return res
        .status(500)
        .json({ msg: "You can`t send response to vacancy from yourself" });
    }
    let index = job.responses
      .map(profile => profile.profile)
      .indexOf(profile._id);
    let setOrUnset;
    if (index === -1) {
      setOrUnset = true;
      job.responses.push({ profile: profile });
    } else {
      setOrUnset = false;
      job.responses.splice(index, 1);
    }
    await job.save();
    res.json({ setOrUnset, job });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

// @route   PUT api/jobs/response/:id/accept/
// @desc    SET accept for job response
// @access  Private
router.put("/response/:id/accept/", auth, async (req, res) => {
  try {
    const job = await Job.findOne({
      responses: { $elemMatch: { _id: req.params.id } }
    });

    let index = job.responses.map(item => item._id).indexOf(req.params.id);
    if (req.user.id !== job.user.toString()) {
      return res
        .status(500)
        .json({ msg: "You can`t response  to foreign vacancies" });
    }
    job.responses[index].accept = !job.responses[index].accept;
    job.responses[index].decline = false;
    await job.save();
    res.json(job.responses[index]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

// @route   PUT api/jobs/response/:id/decline/
// @desc    SET decline for job response
// @access  Private
router.put("/response/:id/decline/", auth, async (req, res) => {
  try {
    const job = await Job.findOne({
      responses: { $elemMatch: { _id: req.params.id } }
    });

    let index = job.responses.map(item => item._id).indexOf(req.params.id);
    if (req.user.id !== job.user.toString()) {
      return res
        .status(500)
        .json({ msg: "You can`t response  to foreign vacancies" });
    }

    job.responses[index].decline = !job.responses[index].decline;
    job.responses[index].accept = false;
    await job.save();
    res.json(job.responses[index]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

// @route   GET api/jobs/response/all/
// @desc    GET all current responses
// @access  Private
router.get("/response/all/", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    if (profile === null) {
      return res.status(500).json({ msg: "You should create profile first" });
    }
    const job = await Job.find({ "responses.profile": profile }).select(
      "-favorites"
    );

    // Kind of filter...
    job.forEach(job => {
      // not sure how to write this mush easy...
      let index = job.responses.map(e => e.profile).indexOf(profile._id);
      job.responses = job.responses[index];
    });

    await res.json(job);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
