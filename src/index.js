import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);



function GeneralInfoSection({
  values,
  setValues,
  errors,
  setErrors,
  handleInputChange
}) {
  const validateJobField = (name, value) => {
    switch(name) {
      case 'JobName':
        return value < 1 ? 'Must be at least 1' : '';
      case 'JobCode':
        return value < 0 ? 'Cannot be negative' : '';
      case 'maxExperience':
        return value < values.minExperience ? 'Must be greater than minimum' : '';
      case 'minCompensation':
        return value < 0 ? 'Cannot be negative' : '';
      case 'maxCompensation':
        return value < values.minCompensation ? 'Must be greater than minimum' : '';
      default:
        return '';
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
        {/* Department options would be populated here */}
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
        {/* Designation options would be populated here */}
      </Form.Control>

      <Form.Label>Employment Type</Form.Label>
      <Form.Control
        as="select"
        name="employmentType"
        value={values.employmentType}
        onChange={handleInputChange}
      >
        {JOB_INFO_FIELDS.employmentType.options.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </Form.Control>

      <Form.Label>Remote Job</Form.Label>
      <div>
        {JOB_INFO_FIELDS.remoteJob.options.map(option => (
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
    </Form.Group>
  );
}

{
        "id": "general-info-group",
        "name": "GENERAL_INFO",
        "seqno": 1,
        "fields": [
          {
            "id": "job-name-field",
            "name": "Job Name",
            "lablekey": "lbl-job-name",
            "seqno": 1,
            "controltype": "textbox",
            "attributedatatype": "text",
            "api_name": "jobName",
            "table_name": "utbl_JobForm",
            "required": true,
            "field_read_only": false,
            "tooltip": "",
            "validation_rule": "",
            "decimal_place": "0",
            "maxlength": "100",
            "placeholder": "",
            "default_value": "",
            "default_value_text": "",
            "label_text": "Job Name",
            "islookup": false,
            "masterid": "",
            "radiogrpname": "",
            "visible": true
          },
          {
            "id": "job-code-field",
            "name": "Job Code",
            "lablekey": "lbl-job-code",
            "seqno": 2,
            "controltype": "textbox",
            "attributedatatype": "text",
            "api_name": "jobCode",
            "table_name": "utbl_JobForm",
            "required": true,
            "field_read_only": false,
            "tooltip": "",
            "validation_rule": "",
            "decimal_place": "0",
            "maxlength": "100",
            "placeholder": "SD",
            "default_value": "",
            "default_value_text": "",
            "label_text": "Job Code",
            "islookup": false,
            "masterid": "",
            "radiogrpname": "",
            "visible": true
          },
          {
            "id": "hiring-manager-field",
            "name": "Hiring Manager",
            "lablekey": "lbl-hiring-manager",
            "seqno": 3,
            "controltype": "dropdown",
            "attributedatatype": "text",
            "api_name": "hiringManager",
            "table_name": "utbl_JobForm",
            "required": true,
            "field_read_only": false,
            "tooltip": "",
            "validation_rule": "",
            "decimal_place": "0",
            "maxlength": "100",
            "placeholder": "",
            "default_value": "",
            "default_value_text": "",
            "label_text": "Hiring Manager",
            "islookup": true,
            "masterid": "hiring-managers-list",
            "radiogrpname": "",
            "visible": true
          },
          {
            "id": "recruiter-field",
            "name": "Recruiter",
            "lablekey": "lbl-recruiter",
            "seqno": 4,
            "controltype": "dropdown",
            "attributedatatype": "text",
            "api_name": "recruiter",
            "table_name": "utbl_JobForm",
            "required": false,
            "field_read_only": false,
            "tooltip": "",
            "validation_rule": "",
            "decimal_place": "0",
            "maxlength": "100",
            "placeholder": "",
            "default_value": "",
            "default_value_text": "",
            "label_text": "Recruiter",
            "islookup": true,
            "masterid": "recruiters-list",
            "radiogrpname": "",
            "visible": true
          },
          {
            "id": "approvers-field",
            "name": "Approvers",
            "lablekey": "lbl-approvers",
            "seqno": 5,
            "controltype": "dropdown",
            "attributedatatype": "text",
            "api_name": "approvers",
            "table_name": "utbl_JobForm",
            "required": true,
            "field_read_only": false,
            "tooltip": "",
            "validation_rule": "",
            "decimal_place": "0",
            "maxlength": "100",
            "placeholder": "",
            "default_value": "",
            "default_value_text": "",
            "label_text": "Approvers",
            "islookup": true,
            "masterid": "approvers-list",
            "radiogrpname": "",
            "visible": true
          },
          {
            "id": "due-date-field",
            "name": "Due Date",
            "lablekey": "lbl-due-date",
            "seqno": 6,
            "controltype": "date",
            "attributedatatype": "datetime",
            "api_name": "dueDate",
            "table_name": "utbl_JobForm",
            "required": true,
            "field_read_only": false,
            "tooltip": "",
            "validation_rule": "",
            "decimal_place": "0",
            "maxlength": "100",
            "placeholder": "",
            "default_value": "",
            "default_value_text": "",
            "label_text": "Due Date",
            "islookup": false,
            "masterid": "",
            "radiogrpname": "",
            "visible": true
          }
        ]
      },
