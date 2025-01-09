import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { Badge } from "react-bootstrap";
import { BsThreeDotsVertical } from "react-icons/bs";

function LeadTable({ data }) {
  return (
    <div className="table-responsive">
      <Table striped hover bordered className="text-center">
        <thead className="table-dark">
          <tr>
            <th>Lead Name</th>
            <th>Lead Stage</th>
            <th>Lead Source</th>
            <th>Status</th>
            <th>Action</th>
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
              <td>
                <button className="btn btn-sm btn-primary">View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

function TabsSection({ title, tabs }) {
  const [key, setKey] = useState(tabs[0]?.key || "");

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="mb-0">{title}</h5>
        <BsThreeDotsVertical />
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

function LeadTablesSection() {
  const todayCallsData = [
    { name: "Mark Otto", stage: "Converted", source: "Sales Honey", status: "Active", statusColor: "success" },
    { name: "Jacob Thornton", stage: "New Lead", source: "Web", status: "Pending", statusColor: "warning" },
    { name: "Larry Bird", stage: "Qualify", source: "LinkedIn", status: "Lost", statusColor: "danger" },
  ];

  const overdueCallsData = [
    { name: "Steve Rogers", stage: "New Lead", source: "Web", status: "Pending", statusColor: "warning" },
    { name: "Tony Stark", stage: "Converted", source: "Referral", status: "Active", statusColor: "success" },
    { name: "Natasha Romanoff", stage: "Bad Contact Info", source: "Email", status: "Lost", statusColor: "danger" },
  ];

  return (
    <div className="container my-4">
      <TabsSection
        title="Lead Lists"
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
    </div>
  );
}

export default LeadTablesSection;
