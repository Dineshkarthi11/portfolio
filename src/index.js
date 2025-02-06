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
                            </Accordion.Collapse> 
                          </Form.Group>
                        </Accordion>
                      </Form>
                    </div>
                                      
                            </Accordion.Collapse> 
                          </Form.Group>
                        </Accordion>
                      </Form>
                    </div>
