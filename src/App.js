import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import { Chart } from "react-google-charts";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { Badge } from "react-bootstrap";
import { IoCallOutline } from "react-icons/io5";
import { BsThreeDotsVertical, BsGraphUp, BsPeople } from "react-icons/bs";

export const data = [
  ["Task", "Hours per Day"],
  ["New Lead", 15],
  ["Qualify", 3],
  ["Bad Contact Info", 4],
  ["Converted", 8],
  ["Existing Account", 10],
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
    <div className="card shadow-sm h-100">
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

function LeadTable({ data }) {
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
        {data.map((lead, index) => (
          <tr key={index}>
            <td>{lead.name}</td>
            <td>{lead.stage}</td>
            <td>{lead.source}</td>
            <td>
              <Badge bg={lead.statusColor}>{lead.status}</Badge>
            </td>
          </tr>
        ))}
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
  const todayCallsData = [
    { name: "Mark Otto", stage: "Converted", source: "Sales Honey", status: "Active", statusColor: "success" },
    { name: "Jacob Thornton", stage: "New Lead", source: "Sales Honey", status: "Pending", statusColor: "warning" },
    { name: "Larry Bird", stage: "Qualify", source: "Web", status: "Lost", statusColor: "danger" },
  ];

  const overdueCallsData = [
    { name: "Steve Rogers", stage: "New Lead", source: "LinkedIn", status: "Pending", statusColor: "warning" },
    { name: "Tony Stark", stage: "Converted", source: "Referral", status: "Active", statusColor: "success" },
    { name: "Natasha Romanoff", stage: "Bad Contact Info", source: "Web", status: "Lost", statusColor: "danger" },
  ];

  return (
    <div className="container my-4">
      <div className="row g-4">
        <div className="col-md-4">
          <Widget
            title="Total Leads"
            value="1,02,890"
            percentage="+40%"
            icon={<BsGraphUp />}
          />
        </div>
        <div className="col-md-4">
          <Widget
            title="Active Leads"
            value="56,562"
            percentage="+20%"
            icon={<BsPeople />}
          />
        </div>
        <div className="col-md-4">
          <Widget
            title="Untouched Leads"
            value="12,342"
            percentage="-5%"
            decrease
            icon={<IoCallOutline />}
          />
        </div>
      </div>
      <TabsSection
        title="Calls"
        tabs={[
          {
            key: "TodayCalls",
            title: "Today Calls (3)",
            content: <LeadTable data={todayCallsData} />,
          },
          {
            key: "OverdueCalls",
            title: "Overdue Calls (3)",
            content: <LeadTable data={overdueCallsData} />,
          },
        ]}
      />
      <div className="mt-4">
        <ArcChart />
      </div>
    </div>
  );
}

export default WidgetGroup;
