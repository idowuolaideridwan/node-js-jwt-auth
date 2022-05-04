import React, { useState } from "react";
import { Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";
import UserService from "../services/user.service";

const Home = () => {
 
  const [content, setContent] = useState("");

  const { user: currentUser } = useSelector((state) => state.auth);

  
    if (!currentUser) {
      return <Redirect to="/login" />;
    }

    UserService.getPublicContent().then(
      (response) => {
      //  console.log(response)
        setContent(response);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );


  return (
    <>

    {(content || []).length > 0 ? (
          <div className='container'>
            {content.map((applicant,index) => (
              <li key={index}>  
              {applicant.payment_reference}
              </li>
            ))}
          </div>
        ) : (
          <h3>sorry, No Record Found</h3>
        )}
    </>
    
  );
};

export default Home;