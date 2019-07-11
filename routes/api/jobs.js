const express = require("express");
const router = express.Router();

const auth = require("../../middleware/auth");
const Job = require("../../models/Job")

const { check, validationResult } = require("express-validator");

// @route   GET api/jobs
// @desc    GET all jobs
// @access  Public
router.get('/', async (req, res) => {
  try {
    const job = await Job.find();
    res.json(job)
  } catch (err) {
    console.error(err.message)
    res.status(500).json({ msg: "Server error" })
  }
})

// @route   POST api/jobs
// @desc    POST new job
// @access  Private
router.post('/', [auth, [check("title", "Title of vacancy is requirement")
  .not()
  .isEmpty(), check("company", "Company of vacancy is requirement")
    .not()
    .isEmpty()]], async (req, res) => {

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const {
        company,
        title,
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
      if (salaryMin) jobsFields.salaryMin = salaryMin;
      if (salaryMax) jobsFields.salaryMax = salaryMax;
      if (description) jobsFields.description = description;
      if (reqs) jobsFields.reqs = reqs;
      if (special) jobsFields.special = special;

      const newJob = new Job({
        user: req.user.id,
        company: jobsFields.company,
        title: jobsFields.title,
        salaryMin: jobsFields.salaryMin,
        salaryMax: jobsFields.salaryMax,
        description: jobsFields.description,
        reqs: jobsFields.reqs,
        special: jobsFields.special
      })

      try {
        const job = await newJob.save()
        res.json(job)
      } catch (err) {
        console.error(err.message)
        res.status(500).json({ msg: "Server error" })
      }
    })

// @route   PUT api/jobs/:id
// @desc    Update job by id
// @access  Private
router.put('/:id', [auth, [check("title", "Title of vacancy is requirement")
  .not()
  .isEmpty(), check("company", "Company of vacancy is requirement")
    .not()
    .isEmpty()]], async (req, res) => {

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      try {
        const {
          company,
          title,
          salaryMin,
          salaryMax,
          description,
          reqs,
          special
        } = req.body;

        // check by null and authentication
        const job = await Job.findById(req.params.id);
        if (job === null) {
          return res.status(500).json({ msg: "There is no vacancy with such id" })
        }
        if (req.user.id != job.user) {
          return res.status(500).json({ msg: "Access denied" })
        }


        if (company) job.company = company;
        if (title) job.title = title;
        if (salaryMin) job.salaryMin = salaryMin;
        if (salaryMax) job.salaryMax = salaryMax;
        if (description) job.description = description;
        if (reqs) job.reqs = reqs;
        if (special) job.special = special;

        await job.save()
        res.json(job)
      } catch (err) {
        console.error(err.message)
        res.status(500).json({ msg: "Server error" })
      }
    })

// @route   DELETE api/jobs/:id
// @desc    DELETE job by id
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (req.user.id != job.user) {
      return res.status(500).json({ msg: "Access denied" })
    }
    job.delete()
    res.json(job)
  } catch (err) {
    console.error(err.message)
    res.status(500).json({ msg: "Server error" })
  }
})


module.exports = router;
