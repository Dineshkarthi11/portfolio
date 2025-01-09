import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { Badge } from "react-bootstrap";

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

  const [key, setKey] = useState("TodayCalls");

  return (
    <div className="container my-4">
      <Tabs
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
        transition={false}
      >
        <Tab eventKey="TodayCalls" title="Today Calls (3)">
          <LeadTable data={todayCallsData} />
        </Tab>
        <Tab eventKey="OverdueCalls" title="Overdue Calls (3)">
          <LeadTable data={overdueCallsData} />
        </Tab>
      </Tabs>
    </div>
  );
}

export default LeadTablesSection;
