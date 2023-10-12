import React from "react";

function PDFDocument({ data }) {
  return (
    <div>
      <h1>Clinic Data</h1>
      <table>
        <thead>
          <tr>
            <th>Clinic Name</th>
            <th>Location</th>
            <th>Contact</th>
            <th>Website</th>
          </tr>
        </thead>
        <tbody>
          {data.map((admin, index) => (
            <tr key={index}>
              <td>{admin.clinicName}</td>
              <td>{admin.clinicLocation}</td>
              <td>{admin.clinicContact}</td>
              <td>{admin.clinicWebsite}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PDFDocument;
