import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { Badge } from "react-bootstrap";
import { FaPhoneAlt } from "react-icons/fa";

function LeadTable({ data }) {
  return (
    <div className="table-responsive">
      <Table striped hover bordered className="text-center">
        <thead className="bg-primary text-white">
          <tr>
            <th>Lead Name</th>
            <th>Lead Stage</th>
            <th>Lead Source</th>
            <th>Status</th>
            <th>Last Contact</th>
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
              <td>{lead.lastContact}</td>
              <td>
                <button className="btn btn-sm btn-info">
                  <FaPhoneAlt /> Call
                </button>
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
    { name: "Mark Otto", stage: "Converted", source: "Sales Honey", status: "Active", statusColor: "success", lastContact: "2025-01-09" },
    { name: "Jacob Thornton", stage: "New Lead", source: "Web", status: "Pending", statusColor: "warning", lastContact: "2025-01-08" },
    { name: "Larry Bird", stage: "Qualify", source: "LinkedIn", status: "Lost", statusColor: "danger", lastContact: "2025-01-07" },
    { name: "Steve Rogers", stage: "Converted", source: "Referral", status: "Active", statusColor: "success", lastContact: "2025-01-06" },
    { name: "Tony Stark", stage: "Bad Contact Info", source: "Email", status: "Lost", statusColor: "danger", lastContact: "2025-01-05" },
    { name: "Natasha Romanoff", stage: "New Lead", source: "Web", status: "Pending", statusColor: "warning", lastContact: "2025-01-04" },
    { name: "Bruce Banner", stage: "Qualify", source: "Sales Honey", status: "Active", statusColor: "success", lastContact: "2025-01-03" },
    { name: "Clint Barton", stage: "Converted", source: "Referral", status: "Active", statusColor: "success", lastContact: "2025-01-02" },
    { name: "Wanda Maximoff", stage: "New Lead", source: "Sales Honey", status: "Pending", statusColor: "warning", lastContact: "2025-01-01" },
    { name: "Vision", stage: "Bad Contact Info", source: "Email", status: "Lost", statusColor: "danger", lastContact: "2024-12-31" },
    { name: "Peter Parker", stage: "Qualify", source: "Web", status: "Active", statusColor: "success", lastContact: "2024-12-30" },
    { name: "Doctor Strange", stage: "Converted", source: "LinkedIn", status: "Active", statusColor: "success", lastContact: "2024-12-29" },
    { name: "Black Panther", stage: "New Lead", source: "Sales Honey", status: "Pending", statusColor: "warning", lastContact: "2024-12-28" },
  ];

  const overdueCallsData = [
    { name: "Sam Wilson", stage: "Converted", source: "Referral", status: "Active", statusColor: "success", lastContact: "2024-11-15" },
    { name: "Bucky Barnes", stage: "New Lead", source: "Email", status: "Pending", statusColor: "warning", lastContact: "2024-11-14" },
    { name: "Nick Fury", stage: "Bad Contact Info", source: "Web", status: "Lost", statusColor: "danger", lastContact: "2024-11-13" },
    { name: "Maria Hill", stage: "Converted", source: "LinkedIn", status: "Active", statusColor: "success", lastContact: "2024-11-12" },
    { name: "Pepper Potts", stage: "Qualify", source: "Referral", status: "Active", statusColor: "success", lastContact: "2024-11-11" },
    { name: "Shuri", stage: "New Lead", source: "Web", status: "Pending", statusColor: "warning", lastContact: "2024-11-10" },
    { name: "Korg", stage: "Bad Contact Info", source: "Email", status: "Lost", statusColor: "danger", lastContact: "2024-11-09" },
    { name: "Mantis", stage: "Converted", source: "Sales Honey", status: "Active", statusColor: "success", lastContact: "2024-11-08" },
    { name: "Drax", stage: "New Lead", source: "Web", status: "Pending", statusColor: "warning", lastContact: "2024-11-07" },
    { name: "Gamora", stage: "Bad Contact Info", source: "Email", status: "Lost", statusColor: "danger", lastContact: "2024-11-06" },
    { name: "Star-Lord", stage: "Converted", source: "Referral", status: "Active", statusColor: "success", lastContact: "2024-11-05" },
    { name: "Rocket Raccoon", stage: "Qualify", source: "Sales Honey", status: "Active", statusColor: "success", lastContact: "2024-11-04" },
  ];

  const [key, setKey] = useState("TodayCalls");

  return (
    <div className="container my-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <Tabs
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3"
            transition={false}
          >
            <Tab eventKey="TodayCalls" title="Today Calls (12)">
              <LeadTable data={todayCallsData} />
            </Tab>
            <Tab eventKey="OverdueCalls" title="Overdue Calls (12)">
              <LeadTable data={overdueCallsData} />
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default LeadTablesSection;
