import React, { useEffect, useState } from "react";

import UserService from "../../../services/user.service";

export default function data() {

  const [content, setContent] = useState([]);

  useEffect(() => {
    UserService.getAppointmentList().then(
      (response) => {
        console.log(response);
        setContent(response);
      },
      (error) => {
        const contentError =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
        setContent(contentError);
      }
    );
  }, []);

  const Columns =  [
    { Header: "serialNumber", accessor: "serialNumber",Cell: (row) => {return <div>{row.row.index+1}</div>;}, width: "10%", align: "left" },
    { Header: "Reference", accessor: "app_ref", width: "10%", align: "left" },
    { Header: "Date & Time", accessor: "date_slot", width: "10%", align: "left" },
    { Header: "Location", accessor: "name", align: "center" },
    { Header: "Amount", accessor: row => new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'USD' }).format(row.info_payment), align: "center" },
    { Header: "Payee", accessor: row => `${row.info_sname} ${row.info_fname}`,align: "center" },
  ];

  const Rows = content;

  return {
    columns:  Columns,
    rows:  Rows
  };
}
