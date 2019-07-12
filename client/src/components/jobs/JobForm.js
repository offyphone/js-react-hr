import React, { useState, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createJob } from "../../actions/jobs";

const JobForm = ({ createJob, history }) => {
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
        special,
    } = formData;

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        createJob(formData, history);
    };

    return (
        <Fragment>
            {" "}
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Company"
                        name="company"
                        value={company}
                        onChange={e => onChange(e)}
                    />

                    <small className="form-text">
                        Put a Company name for vacancy
          </small>
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="title"
                        name="title"
                        value={title}
                        onChange={e => onChange(e)}
                    />
                    <small className="form-text">
                        Title for job offer
          </small>
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
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Minimum salary"
                        name="salaryMin"
                        value={salaryMin}
                        onChange={e => onChange(e)}
                    />
                    <small className="form-text">
                        [Salary - min]
          </small>
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Maximum salary"
                        name="salaryMax"
                        value={salaryMax}
                        onChange={e => onChange(e)}
                    />
                    <small className="form-text">
                        [Salary - max]
          </small>
                </div>
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
                        placeholder="Requimerents"
                        name="reqs"
                        value={reqs}
                        onChange={e => onChange(e)}
                    />
                    <small className="form-text">Requimerents for vacancy</small>
                </div>

                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/jobs">
                    Go Back
        </Link>
            </form>
        </Fragment>
    );
};

export default connect(
    null,
    { createJob }
)(withRouter(JobForm));
