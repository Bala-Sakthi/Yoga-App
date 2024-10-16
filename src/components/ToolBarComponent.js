import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs';
import { FaFilter, FaPlus } from 'react-icons/fa';
import { FiDownload } from 'react-icons/fi';
import { MdOutlineKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { IconContext } from 'react-icons';
import ReactPaginate from 'react-paginate';

const UserListToolbar = ({

    searchPlaceholder = "Search UserList...",
    onSearchChange,
    currentPage,
    totalPages,
    onPageChange,
    onFilterClick,
    onDownloadClick,
    onAddClick,
    startIndex,
    endIndex,
    totalItems
}) => {
  return (
    <Row className="boxShadow p-3 mb-3 mt-3 d-flex flex-lg-row flex-column flex-xxl-row flex-xl-row flex-sm-column flex-md-row">
      <Col className="my-2 mx-2" xxl={3} xl={3} lg={3} sm={6} md={6}>
        <div className="input-group">
          <span className="input-group-text">
            <BsSearch />
          </span>
          <input
            type="text"
            placeholder={searchPlaceholder}
            className="form-control"
            onChange={onSearchChange}
          />
        </div>
      </Col>

      <Col className="d-flex justify-content-end align-items-center mt-2">
     
            <Col className="d-flex justify-content-end align-items-end flex-wrap">
            <span>
          <strong>
            {startIndex} to {endIndex} of {totalItems}
          </strong>
        </span>

            </Col>
        <Col className="d-flex justify-content-center align-items-center mt-3">
            {/* <div>
        <span>
          <strong>
            {startIndex} to {endIndex} of {totalItems}
          </strong>
        </span>
        </div> */}
          <ReactPaginate
            breakLabel="..."
            onPageChange={(selectedPage) => onPageChange(selectedPage.selected + 1)}
            pageRangeDisplayed={5}
            pageCount={totalPages}
            renderOnZeroPageCount={null}
            activeClassName="active"
            pageClassName="d-none"
            pageLinkClassName="d-none"
            previousClassName="arrow-item"
            previousLinkClassName="arrow-link"
            nextClassName="arrow-item"
            nextLinkClassName="arrow-link"
            containerClassName="pagination-arrows"
            previousLabel={
              <IconContext.Provider value={{ color: "black", size: "28px" }}>
                <MdOutlineKeyboardArrowLeft />
              </IconContext.Provider>
            }
            nextLabel={
              <IconContext.Provider value={{ color: "black", size: "28px" }}>
                <MdKeyboardArrowRight />
              </IconContext.Provider>
            }
          />
        </Col>

        <Button variant="outline-primary" className="ms-2" onClick={onFilterClick} style={{ borderColor: "blue" }}>
          <FaFilter size={18} />
        </Button>
        <Button variant="outline-success" className="ms-2" onClick={onDownloadClick}>
          <FiDownload size={18} />
        </Button>
        <Button variant="outline-secondary" className="ms-2" onClick={onAddClick}>
          <FaPlus size={18} />
        </Button>
      </Col>

    </Row>
  );
};

export default UserListToolbar;
