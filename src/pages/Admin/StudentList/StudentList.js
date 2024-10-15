import { Button, Col, Container, Row } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs';
import { FiDownload } from 'react-icons/fi'; // Import FiDownload
import { IconContext } from 'react-icons';
import ReactPaginate from 'react-paginate';
import { MdKeyboardArrowRight, MdOutlineKeyboardArrowLeft } from 'react-icons/md';
import Header from '../../../components/Header';
import { FaFilter } from 'react-icons/fa';
import BasicTable from '../../../components/TablePaginationComponent';
import { useGetStudentListQuery } from '../../../redux/api/StudentListApi';
import { useEffect, useState } from 'react';

const StudentList = (props) => {

  const [data, setData] = useState([]);

  const {
    data: StudentListData,
  } = useGetStudentListQuery();


  useEffect(() => {
    if (StudentListData && StudentListData.data) {
    
      setData(StudentListData.data);
    }

  }, [StudentListData]);


  const COLUMNS = [
    {
      Header: 'ID',
      accessor: 's_no',
    },
    
    {
      Header: 'User Name',
      accessor: 'userName',
    },
    {
      Header: 'Phone Number',
      accessor: 'phoneNumber',
    },
    {
      Header: 'Email',
      accessor: 'email',
    },
    {
      Header: 'Date Of Birth',
      accessor: 'dob',
    },
    {
      Header: 'Address',
      accessor: 'address',
      Cell: ({ value }) => {
        return value && value.length > 0 ? value[0].address : '';
      },
    },

   
  ];


  return (
    <div>
      <Container fluid className="mt-3 reduced-width-row">
       <Header
       HEADING ={"Student List"}
       />
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
          <Col className="d-flex justify-content-end align-items-center mt-3">
  <ReactPaginate
    breakLabel="..."
    onPageChange={(selectedPage) => props.setCurrentPage(selectedPage.selected + 1)}
    pageRangeDisplayed={5}
    pageCount={props.totalPages}
    renderOnZeroPageCount={null}
    activeClassName="active"
    pageClassName="d-none"  // Hide the page numbers
    pageLinkClassName="d-none"  // Hide the page number links
    previousClassName="arrow-item"
    previousLinkClassName="arrow-link"
    nextClassName="arrow-item"
    nextLinkClassName="arrow-link"
    containerClassName="pagination-arrows"
    previousLabel={
      <IconContext.Provider value={{ color: 'black', size: '28px' }}>
        <MdOutlineKeyboardArrowLeft />
      </IconContext.Provider>
    }
    nextLabel={
      <IconContext.Provider value={{ color: 'black', size: '28px' }}>
        <MdKeyboardArrowRight />
      </IconContext.Provider>
    }
  />
</Col>


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
        <Row className="boxShadow p-4 mb-4 ">
              <BasicTable
                COLUMNS={COLUMNS}
                MOCK_DATA={data}       
              />
            </Row>
       
      </Container>
    </div>
  );
};

export default StudentList;
