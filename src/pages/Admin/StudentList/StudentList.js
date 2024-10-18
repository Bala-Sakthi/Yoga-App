import { Container, Row } from "react-bootstrap";
import Header from "../../../components/Header";
import BasicTable from "../../../components/TablePaginationComponent";
import { useGetStudentListQuery } from "../../../redux/api/StudentListApi";
import { useEffect, useState } from "react";
import UserListToolbar from "../../../components/ToolBar";

const StudentList = (props) => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [startIndex, setStartIndex] = useState(1);
  const [endIndex, setEndIndex] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItem] = useState();

  const { data: StudentListData } = useGetStudentListQuery({
    page: currentPage,
    search: searchQuery,
  });

  useEffect(() => {
    if (StudentListData && StudentListData.data) {
      setData(StudentListData.data);
      setStartIndex(StudentListData.pagination.startIndex);
      setCurrentPage(currentPage);
      setTotalItem(StudentListData.pagination.totalItems);
      setEndIndex(StudentListData.pagination.endIndex);
      setTotalPages(StudentListData.pagination.totalPages);
    }
  }, [StudentListData, currentPage]);

  const handleSearchChange = (value) => {
    setSearchQuery(value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleFilterClick = () => {
    console.log('Filter clicked');
  };

  const handleDownloadClick = () => {
    console.log('Download clicked');
  };

  const handleAddClick = () => {
    console.log('Add clicked');
  };

  const handleCloseClick = () => {
    setSearchQuery('');  
  };

  const COLUMNS = [
    {
      Header: "ID",
      accessor: "s_no",
    },
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Phone Number",
      accessor: "phoneNumber",
    },
    {
      Header: "Email",
      accessor: "email",
    },
    {
      Header: "Type Of User",
      accessor: "typeOfUser",
    },
    {
      Header: "Language",
      accessor: "language",
    },
    {
      Header: "Created At",
      accessor: "createdAt",
    }, 
    {
      Header: "Updated At",
      accessor: "updatedAt",
    },
  ];

  return (
    <div>
      <Container fluid className="mt-3 reduced-width-row">
        <Header HEADING={"Student List"} />
        <div>
          <UserListToolbar
            searchPlaceholder="Search StudentList..."
            onSearchChange={handleSearchChange} 
            onPageChange={handlePageChange}
            onFilterClick={handleFilterClick}
            onDownloadClick={handleDownloadClick}
            onSortClick={handleAddClick}
            onCloseClick={handleCloseClick}  
            searchQuery={searchQuery}  
            currentPage={currentPage}
            startIndex={startIndex}
            endIndex={endIndex}
            totalItems={totalItems}
            totalPages={totalPages}
          />
        </div>

        <Row className="boxShadow p-4 mb-4 ">
          <BasicTable COLUMNS={COLUMNS} MOCK_DATA={data} />
        </Row>
      </Container>
    </div>
  );
};

export default StudentList;
