import {Container, Row } from "react-bootstrap";
import Header from "../../../components/Header";
import BasicTable from "../../../components/TablePaginationComponent";
import { useGetTraineeListQuery } from "../../../redux/api/TraineeListApi";
import { useEffect, useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { LuPencil } from "react-icons/lu";
import UserListToolbar from "../../../components/ToolBarComponent";

const TraineeList = (props) => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [startIndex, setStartIndex] = useState(1);
  const [endIndex, setEndIndex] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItem] = useState();

  const { data: TraineeListData } = useGetTraineeListQuery();

  console.log(TraineeListData);
  useEffect(() => {
    if (TraineeListData && TraineeListData.data) {
      setData(TraineeListData.data);
      setStartIndex(TraineeListData.pagination.startIndex);
      setCurrentPage(currentPage);
      setTotalItem(TraineeListData.pagination.totalItems);
      setEndIndex(TraineeListData.pagination.endIndex);
      setTotalPages(TraineeListData.pagination.totalPages);
    }
  }, [TraineeListData,currentPage]);



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
        searchPlaceholder="Search UserList..."
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

export default TraineeList;
