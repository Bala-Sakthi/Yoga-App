import React, { useState } from 'react';
import { Button, Col, Container, Dropdown, Row } from 'react-bootstrap';
import { BsSearch, BsThreeDotsVertical } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import DeleteModel from '../../../components/DeleteModel';
import { BiLeftArrow, BiRightArrow } from 'react-icons/bi';
import { AiFillLeftCircle, AiFillRightCircle } from 'react-icons/ai';
import { FaFilter } from 'react-icons/fa'; // Import FaFilter
import { FiDownload } from 'react-icons/fi'; // Import FiDownload
import { IconContext } from 'react-icons';
import ReactPaginate from 'react-paginate';
import { MdKeyboardArrowRight, MdOutlineKeyboardArrowLeft } from 'react-icons/md';

const StudentList = (props) => {
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
              </Col>

              <Col className="d-lg-flex d-none d-sm-none flex-row flex-wrap justify-content-center align-items-center">
                <div>
                  <Dropdown>
                    <Dropdown.Toggle
                      color="white"
                      id="dropdown-basic"
                      style={{
                        backgroundColor: 'transparent',
                        border: 'none',
                        color: 'white',
                      }}
                    >
                      <img
                        src="https://p7.hiclipart.com/preview/636/702/321/computer-icons-user-profile-avatar-black-man.jpg"
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
              </Col>
            </Row>
          </Col>
        </Row>

        <Row className="boxShadow p-3 mb-3 mt-3 d-flex flex-lg-row flex-column flex-xxl-row flex-xl-row flex-sm-column flex-md-row">
          <Col className="my-2 mx-2" xxl={3} xl={3} lg={3} sm={6} md={6}>
            <div className="input-group">
              <span className="input-group-text">
                <BsSearch />
              </span>
              <input
                type="text"
                placeholder="Search UserList..."
                className="form-control"
              />
            </div>
          </Col>

          {/* Move pagination and icons to the end */}
          <Col className="d-flex justify-content-end align-items-center mt-2">
            <ReactPaginate
              breakLabel="..."
              onPageChange={(selectedPage) =>
                props.setCurrentPage(selectedPage.selected + 1)
              }
              pageRangeDisplayed={5}
              pageCount={props.totalPages}
              renderOnZeroPageCount={null}
              activeClassName={'active'}
              pageClassName={'page-item'}
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              containerClassName="pagination"
              previousLabel={
                <IconContext.Provider value={{ color: 'black', size: '28px' }}>
                  <MdOutlineKeyboardArrowLeft  />
                </IconContext.Provider>
              }
              nextLabel={
                <IconContext.Provider value={{ color: 'black', size: '28px' }}>
                  <MdKeyboardArrowRight  />
                </IconContext.Provider>
              }
            />

            <Button
              variant="outline-primary"
              className="ms-2"
              style={{ borderColor: 'blue' }}
            >
              <FaFilter size={18} />
            </Button>
            <Button variant="outline-success" className="ms-2">
              <FiDownload size={18} />
            </Button>
          </Col>
        </Row>

        <DeleteModel
          DELETESTATE={logoutShow}
          ONCLICK={handleModelClose}
          YES={handleLogin}
          DESCRIPTION="Do You Want To Logout"
          DELETETITLE="Logout"
        />
      </Container>
    </div>
  );
};

export default StudentList;
