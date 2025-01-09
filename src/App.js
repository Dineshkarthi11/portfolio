import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import { Chart } from "react-google-charts";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { Badge } from "react-bootstrap";
import { IoFilterSharp } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";

export const data = [
  ["Task", "Hours per Day"],
  ["New Lead", 11],
  ["Qualify", 2],
  ["Bad Contact Info", 2],
  ["Converted", 2],
  ["Existing Account", 7],
];

export const options = {
  is3D: true,
  backgroundColor: "#f8f9fa",
  pieSliceText: "percentage",
  legend: { position: "bottom" },
  chartArea: { width: "80%", height: "80%" },
  colors: ["#007bff", "#28a745", "#ffc107", "#dc3545", "#6c757d"],
};

export function ArcChart() {
  return (
    <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width={"100%"}
      height={"300px"}
      className="arc-chart"
    />
  );
}

function Widget({ title, value, percentage, icon, decrease }) {
  return (
    <div className="card shadow-sm mb-3">
      <div className="card-body text-center">
        <div className="d-flex justify-content-center align-items-center mb-2">
          <span className={`icon text-${decrease ? "danger" : "success"} me-2`}>
            {icon}
          </span>
          <h5 className="mb-0">{title}</h5>
        </div>
        <h4 className="font-weight-bold mb-2">{value}</h4>
        <p
          className={`text-${
            decrease ? "danger" : "success"
          } font-weight-bold mb-0`}
        >
          {percentage} {decrease ? "↓" : "↑"}
        </p>
      </div>
    </div>
  );
}

function LeadTable() {
  return (
    <Table striped bordered hover responsive className="text-center">
      <thead>
        <tr>
          <th>Lead Name</th>
          <th>Lead Stage</th>
          <th>Lead Source</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Mark Otto</td>
          <td>Converted</td>
          <td>Sales Honey</td>
          <td>
            <Badge bg="success">Active</Badge>
          </td>
        </tr>
        <tr>
          <td>Jacob Thornton</td>
          <td>New Lead</td>
          <td>Sales Honey</td>
          <td>
            <Badge bg="warning">Pending</Badge>
          </td>
        </tr>
        <tr>
          <td>Larry Bird</td>
          <td>Qualify</td>
          <td>Web</td>
          <td>
            <Badge bg="danger">Lost</Badge>
          </td>
        </tr>
      </tbody>
    </Table>
  );
}

function TabsSection({ title, tabs }) {
  const [key, setKey] = useState(tabs[0]?.key || "");
  return (
    <div className="card shadow-sm mb-3">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5>{title}</h5>
        <div>
          <IoFilterSharp className="me-3" />
          <BsThreeDotsVertical />
        </div>
      </div>
      <div className="card-body">
        <Tabs
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-3"
          transition={false}
        >
          {tabs.map((tab) => (
            <Tab key={tab.key} eventKey={tab.key} title={tab.title}>
              {tab.content}
            </Tab>
          ))}
        </Tabs>
      </div>
    </div>
  );
}

function WidgetGroup() {
  return (
    <div className="container my-4">
      <div className="row g-3">
        <div className="col-md-4">
          <Widget
            title="Total Lead"
            value="1,02,890"
            percentage="+40%"
            icon={<IoFilterSharp />}
          />
        </div>
        <div className="col-md-4">
          <Widget
            title="Active Leads"
            value="56,562"
            percentage="+20%"
            icon={<IoFilterSharp />}
          />
        </div>
        <div className="col-md-4">
          <Widget
            title="Untouched Leads"
            value="12,342"
            percentage="-5%"
            decrease
            icon={<IoFilterSharp />}
          />
        </div>
      </div>
      <TabsSection
        title="Calls"
        tabs={[
          {
            key: "Today Calls",
            title: "Today Calls (5)",
            content: <LeadTable />,
          },
          {
            key: "Overdue Calls",
            title: "Overdue Calls (3)",
            content: <LeadTable />,
          },
        ]}
      />
      <ArcChart />
    </div>
  );
}

export default WidgetGroup;
