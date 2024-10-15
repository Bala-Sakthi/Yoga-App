import React, { useState } from "react";
import MainLogo from "../../../assests/images/Frame 25.png";
import "./Nav.css";
import { Col, Container, Dropdown, Offcanvas, Row } from "react-bootstrap";
import { AiOutlineMenu } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { sidebarItems } from "./SideMenu_Data";
import ReactSidebar from "./ReactSidebar";
import DeleteModel from "../../../components/DeleteModel";

const MainNav = () => {
  const [show, setShow] = useState(false);
  const [logoutShow, setLogoutShow] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleNavigateAddForm = () => setShow(true);
  const handleModelClose = () => setLogoutShow(false);
  const handleLogin = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      <Container
        fluid
        className="d-flex  flex-row flex-wrap-wrap justify-content-between align-items-center  overflowX-hidden"
        style={{
          position: "sticky",
          top: "0",
          zIndex: 1000,
          backgroundColor: "#6B78B7",
        }}
      >
        <Row className="d-flex flex-row flex-wrap-wrap justify-content-around align-items-center p-2">
          <Col className="d-lg-none d-xl-none d-sm-flex">
            <AiOutlineMenu
              size={25}
              onClick={handleNavigateAddForm}
              className="pointer"
              color="white"
            />
          </Col>
          <Col
            className="d-lg-flex d-none d-sm-none flex-row flex-wrap-wrap justify-content-between align-items-center"
            style={{ marginRight: "100px" }}
          >
            <img src={MainLogo} width={45} className="pointer" alt="MainLogoImage1" title="MainLogoImage1"></img>
          </Col>
        </Row>

        <Row>
          <Col className='d-lg-none d-sm-flex flex-row flex-wrap-wrap justify-content-between"align-items-center '>
            <img
              src={MainLogo}
              width={50}
              className="p-2 pointer"
              alt="MainLogoImage2"
              title="MainLogoImage2"
            ></img>
          </Col>
        </Row>

        <Row className="d-flex mt-1">
          <Col className="d-lg-none d-sm-flex">
            <Dropdown>
              <Dropdown.Toggle
                className="mobile-view-dropdown"
                id="dropdown-basic"
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  color: "white",
                }}
              >
                <BsThreeDotsVertical
                  size={25}
                  style={{ cursor: "pointer", color: "white" }}
                />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item></Dropdown.Item>{" "}
                <Dropdown.Item onClick={() => setLogoutShow(true)}>
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>

          <Col className='d-lg-flex d-none d-sm-none flex-row flex-wrap-wrap justify-content-center"align-items-center'>
            <div>
              <Dropdown>
                <Dropdown.Toggle
                  color="white"
                  id="dropdown-basic"
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    color: "white",
                  }}
                >
                  <img
                    src="https://p7.hiclipart.com/preview/636/702/321/computer-icons-user-profile-avatar-black-man.jpg"
                    className="rounded-circle"
                    style={{ width: "30px" }}
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
          </Col>
        </Row>
      </Container>

      {/* Conditionally render Offcanvas for large screens */}
      <Row className="d-none d-lg-flex d-xl-flex d-xxl-flex">
        <Offcanvas scroll={false} show={show} onHide={handleClose}>
          <Offcanvas.Header style={{ backgroundColor: "#6B78B7" }} closeButton>
            <Offcanvas.Title
              className="custom-title"
              style={{
                fontSize: "16px",
                color:"white",
              }}
            >
              <img
                src={MainLogo}
                width={50}
                className="rounded-circle p-2"
                alt="..."
              />
              YOGA APP
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body style={{ backgroundColor: " #FFFFFF" }}>
            <ReactSidebar onClick={handleClose} sidebarItems={sidebarItems} />
          </Offcanvas.Body>
        </Offcanvas>
      </Row>

      <DeleteModel
        DELETESTATE={logoutShow}
        ONCLICK={handleModelClose}
        YES={handleLogin}
        DESCRIPTION="Do You Want To Logout"
        DELETETITLE="Logout"
      />
    </>
  );
};

export default MainNav;
