import React, { useEffect, useState } from "react";
import { Navigate  } from "react-router-dom";
import { useSelector } from "react-redux";

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";

// Overview page components
import Header from "layouts/users/components/Header";

// Images
import homeDecor1 from "assets/images/home-decor-1.jpg";

import UserService from "../../services/user.service";

function Overview() {

  const [content, setContent] = useState([]);

  const { user: currentUser } = useSelector((state) => state.auth);

  if (!currentUser) {
    useEffect(()=>{
      localStorage.clear();
      },[]);
   return <Navigate  to="/authentication/sign-in" />;
  };


  useEffect(() => {
    UserService.getUserList().then(
      (response) => {
       // console.log(response);
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


  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header>
        <MDBox pt={2} px={2} lineHeight={1.25}>
          <MDTypography variant="h6" fontWeight="medium">
            User Management
          </MDTypography>
        </MDBox>

        <MDBox p={2}>
          <Grid container spacing={6}>

            {content.map((list) => (
              <Grid item xs={12} md={6} xl={3}>
                <DefaultProjectCard
                  image={homeDecor1}
                  label={list.createdAt}
                  title={list.name}
                  description={"Email Address: " + list.email} 
                  action={{
                    type: "internal",
                    route: "/updateUser/" + list.member_id,
                    color: "info",
                    label: "Change Password"
                  }}
                   />
              </Grid>
            ))}

          </Grid>
        </MDBox>
    </Header>
    <Footer />
    </DashboardLayout>
  );
}

export default Overview;