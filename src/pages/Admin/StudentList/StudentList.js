import { Container, Row } from "react-bootstrap";
import Header from "../../../components/Header";
import BasicTable from "../../../components/TablePaginationComponent";
import { useGetStudentListQuery } from "../../../redux/api/StudentListApi";
import { useEffect, useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { LuPencil } from "react-icons/lu";
import UserListToolbar from "../../../components/ToolBarComponent";

const StudentList = (props) => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [startIndex, setStartIndex] = useState(1);
  const [endIndex, setEndIndex] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItem] = useState();

  const { data: StudentListData } = useGetStudentListQuery();

  console.log(StudentListData);
  useEffect(() => {
    if (StudentListData && StudentListData.data) {
      setData(StudentListData.data);
      setStartIndex(StudentListData.pagination.startIndex);
      setCurrentPage(currentPage);
      setTotalItem(StudentListData.pagination.totalItems);
      setEndIndex(StudentListData.pagination.endIndex);
      setTotalPages(StudentListData.pagination.totalPages);
    }
  }, [StudentListData,currentPage]);



  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
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
    }, {
      Header: "Updated At",
      accessor: "updatedAt",
    },
    {
      Header: "ACTIONS",
      accessor: "action",
      Cell: () => {
        return (
          <div className="d-flex align-items-center justify-content-center flex-row">
            <LuPencil style={{ marginRight: "10px", fontSize: "20px" }} />
            <FaRegTrashCan style={{ fontSize: "20px" }} />
          </div>
        );
      },
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
        onAddClick={handleAddClick}
        currentPage={currentPage}
        startIndex={startIndex}
        endIndex={endIndex}
        setCurrentPage={setCurrentPage}
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
