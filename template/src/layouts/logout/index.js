import React, { useEffect } from "react";
import { Navigate  } from "react-router-dom";

function Overview() {

    useEffect(()=>{
      localStorage.removeItem("user");
      },[]);
      
   return <Navigate  to="/authentication/sign-in" />;
}

export default Overview;
