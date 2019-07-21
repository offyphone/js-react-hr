import React, { useState, Fragment, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { createJob, getJob, editJob } from "../../actions/jobs";

const JobForm = ({
  createJob,
  history,
  editJob,
  match,
  getJob,
  job: { job, loading }
}) => {
  const [formData, setFormData] = useState({
    company: "",
    title: "",
    location: "",
    salaryMin: "",
    salaryMax: "",
    description: "",
    reqs: "",
    special: ""
  });

  const {
    company,
    title,
    location,
    salaryMin,
    salaryMax,
    description,
    reqs,
    special
  } = formData;

  useEffect(() => {
    setFormData({
      company: job === null ? "" : job.company,
      title: job === null ? "" : job.title,
      location: job === null ? "" : job.location,
      salaryMin: job === null ? "" : job.salaryMin,
      salaryMax: job === null ? "" : job.salaryMax,
      description: job === null ? "" : job.description,
      reqs: job === null ? "" : job.reqs,
      special: job === null ? "" : job.special
    });
  }, [job]);

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (match.path.includes("edit-job")) {
      editJob(match.params.id, formData, history);
    } else {
      createJob(formData, history);
    }
  };

  return (
    <Fragment>
      {" "}
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group" />
        <div className="form-group">
          <input
            type="text"
            placeholder="Company"
            name="company"
            value={company}
            onChange={e => onChange(e)}
          />

          <small className="form-text">Put a Company name for vacancy</small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="title"
            name="title"
            value={title}
            onChange={e => onChange(e)}
          />
          <small className="form-text">Title for job offer</small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={e => onChange(e)}
          />
          <small className="form-text">
            City & state suggested (eg. Boston, MA)
          </small>
        </div>
        <table>
          <tbody>
            <tr>
              <td>
                <div className="form-group col">
                  <input
                    type="text"
                    placeholder="Minimum salary"
                    name="salaryMin"
                    value={salaryMin}
                    onChange={e => onChange(e)}
                  />
                </div>
              </td>
              <td>
                <div> - </div>
              </td>
              <td>
                <div className="form-group col">
                  <input
                    type="text"
                    placeholder="Maximum salary"
                    name="salaryMax"
                    value={salaryMax}
                    onChange={e => onChange(e)}
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <small className="form-text">
          Minimum and maximum value for salary
        </small>
        <div className="form-group">
          <textarea
            placeholder="A full description for vacancy"
            name="description"
            value={description}
            onChange={e => onChange(e)}
          />
          <small className="form-text">Tell us about vacancy</small>
        </div>

        <div className="form-group">
          <textarea
            placeholder="A special information for vacancy"
            name="special"
            value={special}
            onChange={e => onChange(e)}
          />
          <small className="form-text">Special information</small>
        </div>

        <div className="form-group">
          <textarea
            placeholder="Requirements"
            name="reqs"
            value={reqs}
            onChange={e => onChange(e)}
          />
          <small className="form-text">Requirements for vacancy</small>
        </div>

        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/jobs">
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

JobForm.propTypes = {
  getJob: PropTypes.func.isRequired,
  editJob: PropTypes.func.isRequired,
  createJob: PropTypes.func.isRequired,
  job: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  job: state.job
});

export default connect(
  mapStateToProps,
  { createJob, getJob, editJob }
)(withRouter(JobForm));
