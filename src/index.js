import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);



function GeneralInfoSection({ values, setValues, errors, setErrors, handleInputChange }) {
  const validateJobField = (name, value) => {
    switch (name) {
      case "JobName":
        return value.length < 1 ? "Must be at least 1 character" : "";
      case "JobCode":
        return value.length < 1 ? "Cannot be empty" : "";
      case "maxExperience":
        return value < values.minExperience ? "Must be greater than minimum" : "";
      case "minCompensation":
        return value < 0 ? "Cannot be negative" : "";
      case "maxCompensation":
        return value < values.minCompensation ? "Must be greater than minimum" : "";
      default:
        return "";
    }
  };

  return (
    <Form.Group>
      <Form.Label>No of Vacancies</Form.Label>
      <Form.Control
        type="number"
        name="noOfVacancies"
        value={values.noOfVacancies}
        onChange={handleInputChange}
        isInvalid={!!errors.noOfVacancies}
      />
      <Form.Control.Feedback type="invalid">
        {errors.noOfVacancies}
      </Form.Control.Feedback>

      <Form.Label>Department</Form.Label>
      <Form.Control
        as="select"
        name="department"
        value={values.department}
        onChange={handleInputChange}
        isInvalid={!!errors.department}
      >
        <option value="">Select Department</option>
        {/* Department options */}
      </Form.Control>

      <Form.Label>Designation</Form.Label>
      <Form.Control
        as="select"
        name="designation"
        value={values.designation}
        onChange={handleInputChange}
        isInvalid={!!errors.designation}
      >
        <option value="">Select Designation</option>
        {/* Designation options */}
      </Form.Control>

      <Form.Label>Employment Type</Form.Label>
      <Form.Control
        as="select"
        name="employmentType"
        value={values.employmentType}
        onChange={handleInputChange}
      >
        {JOB_INFO_FIELDS.employmentType.options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </Form.Control>

      <Form.Label>Remote Job</Form.Label>
      <div>
        {JOB_INFO_FIELDS.remoteJob.options.map((option) => (
          <Form.Check
            key={option}
            inline
            type="radio"
            label={option}
            name="remoteJob"
            value={option}
            checked={values.remoteJob === option}
            onChange={handleInputChange}
          />
        ))}
      </div>

      <Form.Label>Experience (Years)</Form.Label>
      <div className="d-flex">
        <Form.Control
          type="number"
          name="minExperience"
          placeholder="Min"
          value={values.minExperience}
          onChange={handleInputChange}
          isInvalid={!!errors.minExperience}
        />
        <Form.Control
          type="number"
          name="maxExperience"
          placeholder="Max"
          value={values.maxExperience}
          onChange={handleInputChange}
          isInvalid={!!errors.maxExperience}
        />
      </div>

      <Form.Label>Compensation</Form.Label>
      <div className="d-flex">
        <Form.Control
          type="number"
          name="minCompensation"
          placeholder="Min"
          value={values.minCompensation}
          onChange={handleInputChange}
          isInvalid={!!errors.minCompensation}
        />
        <Form.Control
          type="number"
          name="maxCompensation"
          placeholder="Max"
          value={values.maxCompensation}
          onChange={handleInputChange}
          isInvalid={!!errors.maxCompensation}
        />
      </div>

      <Form.Label>Job Description</Form.Label>
      <Form.Control
        as="textarea"
        name="jobDescription"
        value={values.jobDescription}
        onChange={handleInputChange}
        isInvalid={!!errors.jobDescription}
        maxLength={JOB_INFO_FIELDS.jobDescription.maxLength}
      />

      <Form.Label>Skills</Form.Label>
      <Form.Control
        as="textarea"
        name="skills"
        value={values.skills}
        onChange={handleInputChange}
        isInvalid={!!errors.skills}
        maxLength={JOB_INFO_FIELDS.skills.maxLength}
      />

      <Form.Label>Benefits</Form.Label>
      <Form.Control
        as="textarea"
        name="benefits"
        value={values.benefits}
        onChange={handleInputChange}
        maxLength={JOB_INFO_FIELDS.benefits.maxLength}
      />

      {/* New Fields from JSON */}

      <Form.Label>Hiring Manager</Form.Label>
      <Form.Control
        as="select"
        name="hiringManager"
        value={values.hiringManager}
        onChange={handleInputChange}
        isInvalid={!!errors.hiringManager}
      >
        <option value="">Select Hiring Manager</option>
        {/* Populate from API */}
      </Form.Control>

      <Form.Label>Recruiter</Form.Label>
      <Form.Control
        as="select"
        name="recruiter"
        value={values.recruiter}
        onChange={handleInputChange}
        isInvalid={!!errors.recruiter}
      >
        <option value="">Select Recruiter</option>
        {/* Populate from API */}
      </Form.Control>

      <Form.Label>Approvers</Form.Label>
      <Form.Control
        as="select"
        name="approvers"
        value={values.approvers}
        onChange={handleInputChange}
        isInvalid={!!errors.approvers}
      >
        <option value="">Select Approver</option>
        {/* Populate from API */}
      </Form.Control>

      <Form.Label>Due Date</Form.Label>
      <Form.Control
        type="date"
        name="dueDate"
        value={values.dueDate}
        onChange={handleInputChange}
        isInvalid={!!errors.dueDate}
      />
    </Form.Group>
  );
}
