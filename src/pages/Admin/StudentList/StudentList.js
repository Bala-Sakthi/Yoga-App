import React, { useState } from 'react'
import { Button, Col, Container, Dropdown, Row } from 'react-bootstrap'
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import DeleteModel from '../../../components/DeleteModel';

const StudentList = () => {

    const [show, setShow] = useState(false);
    const [logoutShow, setLogoutShow] = useState(false);
    const navigate = useNavigate();
  
    const handleClose = () => setShow(false);
    const handleNavigateAddForm = () => setShow(true);
    const handleModelClose = () => setLogoutShow(false);
    const handleLogin = () => {
      localStorage.clear();
      navigate("/login");
      window.location.reload();
    };

  return (
    <div>
      <Container fluid className="mt-3 reduced-width-row">
        <Row className="p-4 mb-2 mt-2">
          <Col className="d-flex flex-row justify-content-between mt-1">
            <h4 className="fw-bold">Student List</h4>
            
            {/* Dropdown for mobile view */}
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
                    <Dropdown.Item onClick={() => setLogoutShow(true)}>
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>

              <Col className='d-lg-flex d-none d-sm-none flex-row flex-wrap justify-content-center align-items-center'>
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
                        style={{ width: "40px" }}
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
          </Col>
        </Row>

        <DeleteModel
        DELETESTATE={logoutShow}
        ONCLICK={handleModelClose}
        YES={handleLogin}
        DESCRIPTION="Do You Want To Logout"
        DELETETITLE="Logout"
      />
      </Container>    </div>
  )
}

export default StudentList
