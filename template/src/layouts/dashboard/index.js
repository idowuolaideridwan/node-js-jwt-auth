// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";

import React, { useEffect, useState } from "react";
import { Navigate  } from "react-router-dom";
import { useSelector } from "react-redux";
import { CURRENCY } from "../../actions/types";

import UserService from "../../services/user.service";


function Dashboard() {
  
  const { user: currentUser } = useSelector((state) => state.auth);

  if (!currentUser) {
    useEffect(()=>{
      localStorage.removeItem("user");
      localStorage.clear();
      },[]);
   return <Navigate  to="/authentication/sign-in" />;
  };

  const [content, setContent] = useState([]);

  const [state, setState] = useState({});

  useEffect(() => {
    UserService.getRevenueInformation().then(
      (response) => {
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
      Welcome back, {currentUser.name}
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="weekend"
                title="Daily Revenue"
                count={CURRENCY + content.DailyRevenue}
                percentage={{
                  color: "success",
                  amount: "+55%",
                  label: "than lask week",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={8} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="leaderboard"
                title="Weekly Revenue"
                count={CURRENCY + content.WeeklyRevenue}
                percentage={{
                  color: "success",
                  amount: "+3%",
                  label: "than last month",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={2}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="store"
                title="Monthly Revenue"
                count={CURRENCY + content.MonthlyRevenue}
                percentage={{
                  color: "success",
                  amount: "+1%",
                  label: "than yesterday",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={6} md={3} lg={2}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="person_add"
                title="Total Revenue"
                count={CURRENCY + content.TotalRevenue}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Just updated",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={6} md={3} lg={2}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="person_add"
                title="Total Revenue"
                count={CURRENCY + content.TotalRevenue}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Just updated",
                }}
              />
            </MDBox>
          </Grid>
        </Grid>

 
        <MDBox>
          <Grid container spacing={3}>
          
        
           <Grid item xs={12} md={6} lg={12}>
              <Projects />
         </Grid>
        
          </Grid>
        </MDBox>
                    

      </MDBox>

   

      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
