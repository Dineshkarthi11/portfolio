import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);



     <div className="main-content">
                      <Form className={key}>
                        <Accordion defaultActiveKey="0">
                          <Form.Group className="form-group">
                            <CustomToggle eventKey="0">
                              <h4>{sectionlist.name}</h4>
                              <span>
                                <IoIosArrowDown />
                              </span>
                            </CustomToggle>
                            <Accordion.Collapse eventKey="0">
                              <>
                                {sectionlist.name === "JOB_INFO" ? (
                                  <JobInfoSection 
                                    values={jobInfoValues}
                                    setValues={setJobInfoValues}
                                    errors={jobInfoErrors}
                                    setErrors={setJobInfoErrors}
                                    handleInputChange={handleJobInfoChange}
                                  />
                                ) : (
                                  sectionlist.fields
                                    ?.slice()
                                    .sort((a, b) => a.seqno - b.seqno)
                                    .map((FieldList, index) => (
                                      <React.Fragment key={index}>
                                        <DynamicInput
                                          FieldList={FieldList}
                                          inputValues={inputValues}
                                          setInputValues={setInputValues}
                                          validationErrors={validationErrors}
                                          setValidationErrors={setValidationErrors}
                                          showErrors={showErrors}
                                          setShowErrors={setShowErrors}
                                          allInputValues={allInputValues}
                                          setAllInputValues={setAllInputValues}
                                          selectedTagItem={selectedTagItem}
                                          setSelectedTagItem={setSelectedTagItem}
                                          selectedTitleItem={selectedTitleItem}
                                          setSelectedTitleItem={setSelectedTitleItem}
                                          setTitleFieldValue={setTitleFieldValue}
                                          titleFieldValue={titleFieldValue}
                                          Page={ProjectPageDetails?.page || "AddTask"}
                                          setArcFilterPopupshow={setArcFilterPopupshow}
                                          taskInfoPage={taskInfoPage}
                                          masterDataforPopup={masterDataforPopup}
                                          disabled={ProjectPageDetails?.disabled || false}
                                        />
                                      </React.Fragment>
                                    ))
                                )}
                              </>

{
  "result": {
    "id": "job-form-template",
    "name": "Job_Form_Template",
    "groups": [
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
      {
        "id": "job-info-group",
        "name": "JOB_INFO",
        "info": 2,
        "fields": [
          {
            "id": "vacancies-field",
            "name": "No of Vacancies",
            "lablekey": "lbl-vacancies",
            "seqno": 1,
            "controltype": "number",
            "attributedatatype": "numeric",
            "api_name": "noOfVacancies",
            "table_name": "utbl_JobForm",
            "required": true,
            "field_read_only": false,
            "tooltip": "",
            "validation_rule": "",
            "decimal_place": "0",
            "maxlength": "100",
            "placeholder": "",
            "default_value": "5",
            "default_value_text": "",
            "label_text": "No of Vacancies",
            "islookup": false,
            "masterid": "",
            "radiogrpname": "",
            "visible": true
          },
          {
            "id": "department-field",
            "name": "Department",
            "lablekey": "lbl-department",
            "seqno": 2,
            "controltype": "dropdown",
            "attributedatatype": "text",
            "api_name": "department",
            "table_name": "utbl_JobForm",
            "required": true,
            "field_read_only": false,
            "tooltip": "",
            "validation_rule": "",
            "decimal_place": "0",
            "maxlength": "100",
            "placeholder": "",
            "default_value": "ISC",
            "default_value_text": "",
            "label_text": "Department",
            "islookup": true,
            "masterid": "departments-list",
            "radiogrpname": "",
            "visible": true
          },
          {
            "id": "designation-field",
            "name": "Designation",
            "lablekey": "lbl-designation",
            "seqno": 3,
            "controltype": "dropdown",
            "attributedatatype": "text",
            "api_name": "designation",
            "table_name": "utbl_JobForm",
            "required": true,
            "field_read_only": false,
            "tooltip": "",
            "validation_rule": "",
            "decimal_place": "0",
            "maxlength": "100",
            "placeholder": "",
            "default_value": "Research Analyst",
            "default_value_text": "",
            "label_text": "Designation",
            "islookup": true,
            "masterid": "designations-list",
            "radiogrpname": "",
            "visible": true
          },
          {
            "id": "employment-type-field",
            "name": "Employment Type",
            "lablekey": "lbl-employment-type",
            "seqno": 4,
            "controltype": "dropdown",
            "attributedatatype": "text",
            "api_name": "employmentType",
            "table_name": "utbl_JobForm",
            "required": true,
            "field_read_only": false,
            "tooltip": "",
            "validation_rule": "",
            "decimal_place": "0",
            "maxlength": "100",
            "placeholder": "",
            "default_value": "Full-time",
            "default_value_text": "",
            "label_text": "Employment Type",
            "islookup": true,
            "masterid": "employment-types-list",
            "radiogrpname": "",
            "visible": true
          },
          {
            "id": "remote-job-field",
            "name": "Remote Job",
            "lablekey": "lbl-remote-job",
            "seqno": 5,
            "controltype": "radio",
            "attributedatatype": "text",
            "api_name": "remoteJob",
            "table_name": "utbl_JobForm",
            "required": false,
            "field_read_only": false,
            "tooltip": "",
            "validation_rule": "",
            "decimal_place": "0",
            "maxlength": "100",
            "placeholder": "",
            "default_value": "Yes",
            "default_value_text": "",
            "label_text": "Remote Job",
            "islookup": false,
            "masterid": "",
            "radiogrpname": "remote-job-group",
            "visible": true
          },
          {
            "id": "min-experience-field",
            "name": "Min Experience",
            "lablekey": "lbl-min-experience",
            "seqno": 6,
            "controltype": "number",
            "attributedatatype": "numeric",
            "api_name": "minExperience",
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
            "label_text": "Min Experience",
            "islookup": false,
            "masterid": "",
            "radiogrpname": "",
            "visible": true
          },
          {
            "id": "max-experience-field",
            "name": "Max Experience",
            "lablekey": "lbl-max-experience",
            "seqno": 7,
            "controltype": "number",
            "attributedatatype": "numeric",
            "api_name": "maxExperience",
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
            "label_text": "Max Experience",
            "islookup": false,
            "masterid": "",
            "radiogrpname": "",
            "visible": true
          },
          {
            "id": "min-compensation-field",
            "name": "Min Compensation",
            "lablekey": "lbl-min-compensation",
            "seqno": 8,
            "controltype": "number",
            "attributedatatype": "numeric",
            "api_name": "minCompensation",
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
            "label_text": "Min Compensation",
            "islookup": false,
            "masterid": "",
            "radiogrpname": "",
            "visible": true
          },
          {
            "id": "max-compensation-field",
            "name": "Max Compensation",
            "lablekey": "lbl-max-compensation",
            "seqno": 9,
            "controltype": "number",
            "attributedatatype": "numeric",
            "api_name": "maxCompensation",
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
            "label_text": "Max Compensation",
            "islookup": false,
            "masterid": "",
            "radiogrpname": "",
            "visible": true
          },
          {
            "id": "job-description-field",
            "name": "Job Description",
            "lablekey": "lbl-job-description",
            "seqno": 1,
            "controltype": "textarea",
            "attributedatatype": "text",
            "api_name": "jobDescription",
            "table_name": "utbl_JobForm",
            "required": true,
            "field_read_only": false,
            "tooltip": "",
            "validation_rule": "",
            "decimal_place": "0",
            "maxlength": "2000",
            "placeholder": "",
            "default_value": "",
            "default_value_text": "",
            "label_text": "Job Description",
            "islookup": false,
            "masterid": "",
            "radiogrpname": "",
            "visible": true
          },
          {
            "id": "skills-field",
            "name": "Skills",
            "lablekey": "lbl-skills",
            "seqno": 1,
            "controltype": "textarea",
            "attributedatatype": "text",
            "api_name": "skills",
            "table_name": "utbl_JobForm",
            "required": true,
            "field_read_only": false,
            "tooltip": "Required skillsets, additional skills, technical skills to be updated here",
            "validation_rule": "",
            "decimal_place": "0",
            "maxlength": "2000",
            "placeholder": "",
            "default_value": "",
            "default_value_text": "",
            "label_text": "Skills",
            "islookup": false,
            "masterid": "",
            "radiogrpname": "",
            "visible": true
          },
          {
            "id": "benefits-field",
            "name": "Benefits",
            "lablekey": "lbl-benefits",
            "seqno": 1,
            "controltype": "textarea",
            "attributedatatype": "text",
            "api_name": "benefits",
            "table_name": "utbl_JobForm",
            "required": false,
            "field_read_only": false,
            "tooltip": "Additional benefits, ex: incentives, insurances, perks to be updated here",
            "validation_rule": "",
            "decimal_place": "0",
            "maxlength": "2000",
            "placeholder": "",
            "default_value": "",
            "default_value_text": "",
            "label_text": "Benefits",
            "islookup": false,
            "masterid": "",
            "radiogrpname": "",
            "visible": true
          }
        ]
      },
      {
        "id": "interview-plan-group",
        "name": "INTERVIEW_PLAN",
        "seqno": 6,
        "fields": [
          {
            "id": "interview-plan-field",
            "name": "Interview Plan",
            "lablekey": "lbl-interview-plan",
            "seqno": 1,
            "controltype": "textarea",
            "attributedatatype": "text",
            "api_name": "interviewPlan",
            "table_name": "utbl_JobForm",
            "required": false,
            "field_read_only": false,
            "tooltip": "Detailed interview process, evaluation criteria, and special instructions",
            "validation_rule": "",
            "decimal_place": "0",
            "maxlength": "2000",
            "placeholder": "",
            "default_value": "",
            "default_value_text": "",
            "label_text": "Interview Plan",
            "islookup": false,
            "masterid": "",
            "radiogrpname": "",
            "visible": true
          },
          {
            "id": "interview-questions-field",
            "name": "Interview Questions",
            "lablekey": "lbl-interview-questions",
            "seqno": 2,
            "controltype": "list",
            "attributedatatype": "array",
            "api_name": "interviewQuestions",
            "table_name": "utbl_JobForm",
            "required": false,
            "field_read_only": false,
            "tooltip": "List of recommended interview questions",
            "validation_rule": "",
            "decimal_place": "0",
            "maxlength": "1000",
            "placeholder": "",
            "default_value": "[]",
            "default_value_text": "",
            "label_text": "Interview Questions",
            "islookup": false,
            "masterid": "",
            "radiogrpname": "",
            "visible": true
          },
          {
            "id": "evaluation-criteria-field",
            "name": "Evaluation Criteria",
            "lablekey": "lbl-evaluation-criteria",
            "seqno": 3,
            "controltype": "list",
            "attributedatatype": "array",
            "api_name": "evaluationCriteria",
            "table_name": "utbl_JobForm",
            "required": false,
            "field_read_only": false,
            "tooltip": "Specific criteria for evaluating candidates",
            "validation_rule": "",
            "decimal_place": "0",
            "maxlength": "1000",
            "placeholder": "",
            "default_value": "[]",
            "default_value_text": "",
            "label_text": "Evaluation Criteria",
            "islookup": false,
            "masterid": "",
            "radiogrpname": "",
            "visible": true
          },
          {
            "id": "stage-owners-field",
            "name": "Stage Owners",
            "lablekey": "lbl-stage-owners",
            "seqno": 4,
            "controltype": "list",
            "attributedatatype": "array",
            "api_name": "stageOwners",
            "table_name": "utbl_JobForm",
            "required": false,
            "field_read_only": false,
            "tooltip": "Assigned interviewers for each stage",
            "validation_rule": "",
            "decimal_place": "0",
            "maxlength": "1000",
            "placeholder": "",
            "default_value": "[]",
            "default_value_text": "",
            "label_text": "Stage Owners",
            "islookup": true,
            "masterid": "employees-list",
            "radiogrpname": "",
            "visible": true
          }
        ]
      },
      {
        "id": "interview-stages-group",
        "name": "INTERVIEW_STAGES",
        "seqno": 3,
        "fields": [
          {
            "id": "stages-field",
            "name": "Interview Stages",
            "lablekey": "lbl-interview-stages",
            "seqno": 1,
            "controltype": "list",
            "attributedatatype": "array",
            "api_name": "interviewStages",
            "table_name": "utbl_JobForm",
            "required": false,
            "field_read_only": false,
            "tooltip": "",
            "validation_rule": "",
            "decimal_place": "0",
            "maxlength": "100",
            "placeholder": "",
            "default_value": "[{\"id\":1,\"name\":\"Application Review\"},{\"id\":2,\"name\":\"Pre-Screening\"},{\"id\":3,\"name\":\"Face to Face\"},{\"id\":4,\"name\":\"Take Home Test\"},{\"id\":5,\"name\":\"Hiring Manager Review\"},{\"id\":6,\"name\":\"Offer\"}]",
            "default_value_text": "",
            "label_text": "Interview Stages",
            "islookup": false,
            "masterid": "",
            "radiogrpname": "",
            "visible": true
          }
        ]
      },
      {
        "id": "scorecard-group",
        "name": "SCORECARD",
        "seqno": 4,
        "fields": [
          {
            "id": "categories-field",
            "name": "Scorecard Categories",
            "lablekey": "lbl-scorecard-categories",
            "seqno": 1,
            "controltype": "list",
            "attributedatatype": "array",
            "api_name": "scorecard.categories",
            "table_name": "utbl_JobForm",
            "required": false,
            "field_read_only": false,
            "tooltip": "",
            "validation_rule": "",
            "decimal_place": "0",
            "maxlength": "100",
            "placeholder": "",
            "default_value": "[{\"name\":\"Skills\",\"attributes\":[]}]",
            "default_value_text": "",
            "label_text": "Scorecard Categories",
            "islookup": false,
            "masterid": "",
            "radiogrpname": "",
            "visible": true
          }
        ]
      },
      {
        "id": "attachments-group",
        "name": "ATTACHMENTS",
        "seqno": 5,
        "fields": [
          {
            "id": "attachments-field",
            "name": "Attachments",
            "lablekey": "lbl-attachments",
            "seqno": 1,
            "controltype": "file",
            "attributedatatype": "array",
            "api_name": "attachments",
            "table_name": "utbl_JobForm",
            "required": false,
            "field_read_only": false,
            "tooltip": "",
            "validation_rule": "",
            "decimal_place": "0",
            "maxlength": "100",
            "placeholder": "",
            "default_value": "[]",
            "default_value_text": "",
            "label_text": "Attachments",
            "islookup": false,
            "masterid": "",
            "radiogrpname": "",
            "visible": true
          }
        ]
      }
    ]
  }
}


