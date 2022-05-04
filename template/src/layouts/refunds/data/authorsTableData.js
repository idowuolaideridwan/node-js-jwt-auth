import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UserService from "../../../services/user.service";

export default function data() {

  const { user: currentUser } = useSelector((state) => state.auth);

  const [refund, setRefund] = useState([]);

  useEffect(() => {
    UserService.getRefundList().then(
      (response) => {
        setRefund(response);
      },
      (error) => {
        const contentError =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
          setRefund(contentError);
      }
    );
  }, []);

   if (!currentUser) {
   return <Navigate  to="/authentication/sign-in" />;
  };

  const Columns =  [
    { Header: "serialNumber", accessor: "serialNumber",Cell: (row) => {return <div>{row.row.index+1}</div>;}, width: "10%", align: "left" },
    { Header: "Reference", accessor: "app_ref", width: "10%", align: "left" },
    { Header: "Date & Time", accessor: "info_date", width: "10%", align: "left" },
    { Header: "Phone", accessor: "info_phone", align: "center" },
    { Header: "Email", accessor: "info_email", align: "center" },
    { Header: "Amount", accessor: row => new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'USD' }).format(row.info_payment), align: "center" },
    { Header: "Payee", accessor: row => `${row.info_sname} ${row.info_fname}`,align: "center" },
  ];

  const Rows = refund;

  return {
    columns:  Columns,
    rows:  Rows
  };
}
