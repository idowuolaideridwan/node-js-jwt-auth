import React, { useEffect, useState, useRef } from "react";
import { Navigate,useParams  } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Overview page components
import Header from "layouts/updateUser/components/Header";

import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";

import UserService from "../../services/user.service";
import { updateUser } from "../../actions/user";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

function UpdateUser() {

  const [content, setContent] = useState([]);

  const { user: currentUser } = useSelector((state) => state.auth);

  const form = useRef();
  const checkBtn = useRef();

  const [loading, setLoading] = useState(false);

  const { message } = useSelector(state => state.message);

  const dispatch = useDispatch();

  const onChangeMemberID = (e) => {
    const member_id = e.target.value;
    setName(member_id);
  };

  const onChangeName = (e) => {
    const name = e.target.value;
    setName(name);
  };

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUseranme(username);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const { id } = useParams();
  //console.log(id);

  if (!currentUser) {
    useEffect(()=>{
      localStorage.clear();
      },[]);
   return <Navigate  to="/authentication/sign-in" />;
  };


  useEffect(() => {
    UserService.getUserList().then(
      (response) => {
       const findUserByMemberID = (member_id) => 
       {;
        const key = Object.keys(response).find(user => response[user].member_id === id);
        return response[key];
      };
      
     const singleUser = findUserByMemberID(id);

        setContent(singleUser);
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
  //console.log(content.username);

  const [member_id, setMemberID] = useState(content.member_id);
  const [name, setName] = useState("");
  const [username, setUseranme] = useState("");
  const [email, setEmail] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
   const  member_id = content.member_id;
    console.log(member_id);
    dispatch(updateUser( name, username, email , member_id )) .then(() => {
    })
    .catch(() => {
   
    });
  };


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

        <Form onSubmit={onSubmit} ref={form}>
          
          <MDBox pt={4} pb={3} px={3}> 
          <MDBox role="form">
        
          <MDBox mb={2}>
              <MDInput
                type="text"
                className="form-control"
                name="name"
                value={content.name}
                onChange={onChangeName}
                validations={[required]}
                fullWidth
              />
            </MDBox>

            <MDBox mb={2}>
              <MDInput
                type="text"
                className="form-control"
                name="username"
                value={content.username}
                onChange={onChangeUsername}
                validations={[required]}
                fullWidth
              />
            </MDBox>

            <MDBox mb={2}>
              <MDInput
                type="text"
                className="form-control"
                name="email"
                value={content.email}
                onChange={onChangeEmail}
                validations={[required]}
                fullWidth
              />
            </MDBox>
  
             <MDBox mt={4} mb={1}>
              <button className="btn btn-primary btn-block" disabled={loading}>
                {loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                 <MDButton variant="gradient" color="info" fullWidth>
                  Update
                </MDButton>
              </button>
              </MDBox>
          
            {message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {message}
                </div>
              </div>
            )}
            <CheckButton style={{ display: "none" }} ref={checkBtn} />
            </MDBox>
            </MDBox>
          </Form>
  
       
    </Header>
    <Footer />
    </DashboardLayout>
  );
}

export default UpdateUser;