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
            {(() => {
              switch (sectionlist.name) {
                case "JOB_INFO":
                  return (
                    <JobInfoSection 
                      values={jobInfoValues}
                      setValues={setJobInfoValues}
                      errors={jobInfoErrors}
                      setErrors={setJobInfoErrors}
                      handleInputChange={handleJobInfoChange}
                    />
                  );

                case "GENERAL_INFO":
                  return (
                    <GeneralInfoSection
                      values={generalInfoValues}
                      setValues={setGeneralInfoValues}
                      errors={generalInfoErrors}
                      setErrors={setGeneralInfoErrors}
                      handleInputChange={handleGeneralInfoChange}
                    />
                  );

                case "INTERVIEW_PLAN":
                  return (
                    <InterviewPlanSection
                      values={interviewPlanValues}
                      setValues={setInterviewPlanValues}
                      errors={interviewPlanErrors}
                      setErrors={setInterviewPlanErrors}
                      handleInputChange={handleInterviewPlanChange}
                    />
                  );

                case "STAGE":
                  return (
                    <StageSection
                      values={stageValues}
                      setValues={setStageValues}
                      errors={stageErrors}
                      setErrors={setStageErrors}
                      handleInputChange={handleStageChange}
                    />
                  );

                case "ATTACHMENTS":
                  return (
                    <AttachmentsSection
                      files={attachmentFiles}
                      setFiles={setAttachmentFiles}
                      errors={attachmentErrors}
                      setErrors={setAttachmentErrors}
                    />
                  );

                default:
                  return sectionlist.fields
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
                    ));
              }
            })()}
          </>
        </Accordion.Collapse>
      </Form.Group>
    </Accordion>
  </Form>
</div>
