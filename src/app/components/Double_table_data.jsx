import { Poppins500, Roboto500 } from "@/fonts";
import React from "react";

const Double_table_data = ({
  Doubletable_heading = [],
  Doubletable_data = [],
  Doubletable_heading2 = [],
  Doubletable_data2 = [],
  Doubletable_heading3 = [],
  Doubletable_data3 = [],
  Doubletable_heading4 = [],
  Doubletable_data4 = [],
}) => {
  return (
    <>
      {/* 🔹 First Table */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              {Doubletable_heading.map((heading, i) => (
                <th className={`${Roboto500.className}`} key={i}>{heading}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Doubletable_data.map((item, i) => (
              <tr key={i}>
                <td className={`${Roboto500.className}`}>{item.phone}</td>
                <td className={`${Roboto500.className}`}>{item.name}</td>
                <td className={`${Roboto500.className}`}>{item.email}</td>
                <td className={`${Roboto500.className} ${item.status === "Completed"
                  ? "status-completed"
                  : item.status === "Pending"
                    ? "status-pending"
                    : "status-cancelled"}`}
                >
                  {item.status}
                </td>
                <td className={`${Roboto500.className} position-relative custom-action-cell`}>
                  <i
                    className="fa-solid fa-ellipsis-vertical custom-toggle"
                    style={{ cursor: "pointer" }}
                  ></i>
                  <div className="custom-dropdown-menu" style={{ display: "none" }}>
                    <div className="custom-dropdown-item">View</div>
                    <div className="custom-dropdown-item text-danger">Delete</div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* table 2 */}
        <table>
          <thead>
            <tr>
              {Doubletable_heading3.map((heading, i) => (
                <th className={`${Roboto500.className}`} key={i}>{heading}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Doubletable_data3.map((item, i) => (
              <tr key={i}>
                <td className={`${Roboto500.className}`}>{item.id}</td>
                <td className={`${Roboto500.className}`}>{item.type}</td>
                <td className={`${Roboto500.className}`}>{item.amount}</td>
                <td className={`${Roboto500.className} ${item.status === "Completed"
                  ? "status-completed"
                  : item.status === "Pending"
                    ? "status-pending"
                    : "status-cancelled"}`}
                >
                  {item.status}
                </td>
                <td className={`${Roboto500.className}`}>{item.renewal}</td>
                <td className={`${Roboto500.className} position-relative custom-action-cell`}>
                  <i
                    className="fa-solid fa-ellipsis-vertical custom-toggle"
                    style={{ cursor: "pointer" }}
                  ></i>
                  <div className="custom-dropdown-menu" style={{ display: "none" }}>
                    <div className="custom-dropdown-item">View</div>
                    <div className="custom-dropdown-item text-danger">Delete</div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* table 2 */}

        {/* table 3 */}
        <table>
          <thead>
            <tr>
              {Doubletable_heading4.map((heading, i) => (
                <th className={`${Roboto500.className}`} key={i}>{heading}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Doubletable_data4.map((item, i) => (
              <tr key={i}>
                <td className={`${Roboto500.className}`}>{item.type}</td>
                <td className={`${Roboto500.className}`}>{item.group}</td>
                <td className={`${Roboto500.className} ${item.status === "Completed"
                  ? "status-completed"
                  : item.status === "Pending"
                    ? "status-pending"
                    : "status-cancelled"}`}
                >
                  {item.status}
                </td>
                <td className={`${Roboto500.className}`}>{item.date_sent}</td>
                {/* <td className={`${Roboto500.className} ="position-relative custom-action`}l">
                  <i
                    className="fa-solid fa-ellipsis-vertical custom-toggle"
                    style={{ cursor: "pointer" }}
                  ></i>
                  <div className="custom-dropdown-menu" style={{ display: "none" }}>
                    <div className="custom-dropdown-item">View</div>
                    <div className="custom-dropdown-item text-danger">Delete</div>
                  </div>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
        {/* table 3 */}

        {/* table 4 */}
        <table>
          <thead>
            <tr>
              {Doubletable_heading2.map((heading2, i) => (
                <th className={`${Roboto500.className}`} key={i}>{heading2}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Doubletable_data2.map((item, i) => (
              <tr key={i}>
                <td className={`${Roboto500.className}`}>{item.name}</td>
                <td className={`${Roboto500.className}`}>{item.phone}</td>
                <td className={`${Roboto500.className}`}>{item.email}</td>
                <td className={`${Roboto500.className} position-relative custom-action-cell`}>
                  <i
                    className="fa-solid fa-ellipsis-vertical custom-toggle"
                    style={{ cursor: "pointer" }}
                  ></i>
                  <div className="custom-dropdown-menu" style={{ display: "none" }}>
                    <div className="custom-dropdown-item">View</div>
                    <div className="custom-dropdown-item text-danger">Delete</div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* table 4 */}
      </div>

    </>
  );
};

export default Double_table_data;
