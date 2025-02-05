import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useLanguage from "@/locale/useLanguage";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { Dropdown, DropdownButton } from "react-bootstrap";

import { BsGrid } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import AddTask from "./Addtask/Addtask";

import { RiListSettingsFill } from "react-icons/ri";

import PageSetup from "@/context/GlobalContext/PageSetup.json";

import { ContextWidthProvider } from "@/context/widthContext/widthContext";

import {
  entitiesInfo,
  dataSetListInfo,
  usereamilInfo,
} from "@/redux/Task/selector";
import { PiExportBold } from "react-icons/pi";
import { ArcIconComponents } from "@/components/arccomponents/ArcIcon";
import ARcexportalertpopup from "@/components/arccomponents/ui-components/ArcAlertPopup/ARcexportalertpopup";
// import { GrNotes } from "react-icons/gr";
import { CgImport } from "react-icons/cg";
import { CreateNewExport } from "@/redux/Exporthistory/Createnewexport/createNewExport";
import { postDataInfo } from "@/redux/Task/selector";
import Exporttypepopup from "@/components/arccomponents/ui-components/ArcAlertPopup/Exporttypepopup";
import ArcFilterPopup from "@/components/arccomponents/ui-components/ArcTaskAutocompletesearch/ArcFilterPopup";
import EditTask from "@/components/TaskComp/Wijmo/components/Update/EditTask";
import {
  SelectedRowContext,
  SelectedRowContextProvider,
} from "@/context/SelectedRow/SelectedRowContext";
import { WeekFilterV3 } from "@/components/arccomponents/ui-components/ArcYearWeekPicker/ArcYearWeekPicker";
//import { SelectedRowContextProvider } from "@/context/SelectedRow/SelectedRowContext";
export default function ListHeader({
  DataSetPopupShow,
  setDataSetPopupShow,
  DataSetButton,
  DATASET_API,
}) {
  const translate = useLanguage();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const exportedfrom = "Task";
  const postdata = useSelector(postDataInfo);
  console.log("Inside ListPage ListHeader");
  const { ScreenWidth, BreakpointSm } = useContext(ContextWidthProvider);

  const entities = useSelector(entitiesInfo);
  console.log(entities);
  const dataSetList = useSelector(dataSetListInfo);
  const loggedinusermail = useSelector(usereamilInfo);
  const ModuleHeader = PageSetup.Pages.ListPage.Header;

  var [popupshow, setpopupshow] = useState(false);
  var [Formatpopupshow, setFormatpopupshow] = useState(false);

  // const [ArcFilterPopupshow, setArcFilterPopupshow] = useState(false);


  //
  // const [addTaskShow, setAddTaskShow] = useState(false);
  const { addTaskShow, setAddTaskShow, titleFieldValue, setTitleFieldValue } =
    useContext(SelectedRowContext);
  //edit task

  const [editTaskShow, setEditTaskShow] = useState(false);
  const [selectedRow, setSelectedRow] = useState([]);
  // const [titleFieldValue, setTitleFieldValue] = useState([]);
  const [UpdateselectedTagItemEdit, setUpdateselectedTagItemEdit] = useState(
    []
  );
  const [istageditedEditTask, setistageditedEditTask] = useState(false);

  const {
    selectedRow1,
    EditTaskShow,
    ArcFilterPopupshow,
    setArcFilterPopupshow,
  } = useContext(SelectedRowContext);
  console.log(EditTaskShow, "s12");
  console.log(selectedRow1, "empty");

  return (
    <React.Fragment>
      <ArcFilterPopup
        Title="Arc Filter Popup"
        // ArcPopupshow={ArcFilterPopupshow}
        // setArcPopupshow={setArcFilterPopupshow}
        BtnClassName="arc-btn-primary"
        PopupClassName=""
        centered={true}
        setEditShow={setEditTaskShow}
        setSelectedRow={setSelectedRow}
        selectedRow={selectedRow}
        setAddTaskShow={setAddTaskShow}
        // titleFieldValue={titleFieldValue}
        // setTitleFieldValue={setTitleFieldValue}
      ></ArcFilterPopup>
    
      {ModuleHeader.Visibility && (
        <section className="list-header">
          <Container fluid>
            <Row>
              <Col xxl={12}>
                <div className="list-header-inside">
                  <div className="filter-dropdown">
                    {ModuleHeader.DataSetIcon && (
                      <span
                        ref={DataSetButton}
                        className={`icon ${
                          DataSetPopupShow ? "true" : "false"
                        }`}
                        onClick={() =>
                          setDataSetPopupShow(
                            (prevDataSetPopupShow) => !prevDataSetPopupShow
                          )
                        }
                      >
                        <BsGrid />
                      </span>
                    )}

                    <div className="drop-down">
                      <div className="select-div">
                        <p>Jobs Opening</p>
                      </div>
                      {dataSetList.map((data, index) => (
                        <span key={index}>{data.isselected && data.title}</span>
                      ))}
                    </div>
                  </div>
                  <div className="action-add">
                    {ModuleHeader.HeaderButton.MoreAction.Visibility && (
                      <DropdownButton
                        align="end"
                        id="dropdown-item-button"
                        title={
                          ScreenWidth > BreakpointSm ? (
                            <>
                              {ModuleHeader.HeaderButton.MoreAction.Label}
                              <span>
                                <IoIosArrowDown />
                              </span>
                            </>
                          ) : (
                            <span>
                              <RiListSettingsFill />
                            </span>
                          )
                        }
                      >
                        <div className="item-div">
                          {ModuleHeader.HeaderButton.MoreAction.DropdownOptions.map(
                            (data, index) => (
                              <Dropdown.Item
                                eventKey={data}
                                as="button"
                                key={index}
                              >
                                {ArcIconComponents[data.Icon]}
                                {data.Label}
                              </Dropdown.Item>
                            )
                          )}
                        </div>
                      </DropdownButton>
                    )}

                    
                    <AddTask
                      setArcFilterPopupshow={setArcFilterPopupshow}
                      show={addTaskShow}
                      setShow={setAddTaskShow}
                      // setTitleFieldValue={setTitleFieldValue}
                      // titleFieldValue={titleFieldValue}
                    />

                    <EditTask
                      show={editTaskShow}
                      setShow={setEditTaskShow}
                      SelectedRow={selectedRow}
                      UpdateselectedTagItem={UpdateselectedTagItemEdit}
                      setUpdateselectedTagItem={setUpdateselectedTagItemEdit}
                      istagedited={istageditedEditTask}
                      setistagedited={setistageditedEditTask}
                    />
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      )}
    </React.Fragment>
  );
}

