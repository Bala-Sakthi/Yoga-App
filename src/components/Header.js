import React, { useState } from "react";
import {Col, Dropdown, Row } from "react-bootstrap";
import { BsThreeDotsVertical } from "react-icons/bs";
import DeleteModel from "./DeleteModel";
import { useNavigate } from "react-router-dom";
import loginImage from "../assests/images/smalllogo.png";


const Header = (props) => {
    const [show, setShow] = useState(false);
    const [logoutShow, setLogoutShow] = useState(false);
    const navigate = useNavigate();
  
    const handleClose = () => setShow(false);
    const handleNavigateAddForm = () => setShow(true);
    const handleModelClose = () => setLogoutShow(false);
    const handleLogin = () => {
      localStorage.clear();
      navigate('/login');
      window.location.reload();
    };
  return (
    <div className="ml-xxl-n3 ml-xl-n3 ml-lg-n3">
       <Row className="p-4 mb-2 mt-2">
  <Col className="d-flex flex-row justify-content-between mt-1 align-items-center">
    <h4 className="fw-bold">{props.HEADING}</h4>

    {/* Dropdowns for different views */}
    <div className="d-flex flex-row align-items-center">
      {/* Mobile view */}
      <div className="d-lg-none d-sm-flex">
        <Dropdown>
          <Dropdown.Toggle
            className="mobile-view-dropdown"
            id="dropdown-basic"
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              color: 'white',
            }}
          >
            <BsThreeDotsVertical
              size={25}
              style={{ cursor: 'pointer', color: 'white' }}
            />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => setLogoutShow(true)}>
              Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      {/* Desktop view */}
      <div className="d-lg-flex d-none align-items-center ms-3">
        <Dropdown>
          <Dropdown.Toggle
            id="dropdown-basic"
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              color: 'white',
            }}
          >
            <img
              src={loginImage}
              className="rounded-circle"
              style={{ width: '40px' }}
              alt="Avatar"
            />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => setLogoutShow(true)}>
              Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  </Col>
</Row>


        <DeleteModel
          DELETESTATE={logoutShow}
          ONCLICK={handleModelClose}
          YES={handleLogin}
          DESCRIPTION="Do You Want To Logout"
          DELETETITLE="Logout"
        />
    </div>
  );
};

export default Header;
