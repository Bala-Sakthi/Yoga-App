import { Container,Row } from "react-bootstrap";
import Header from "../../../components/Header";
import BasicTable from "../../../components/TablePaginationComponent";
import { useDeleteRatingsMutation, useGetRatingsQuery } from "../../../redux/api/RatingsApi";
import { useEffect, useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import UserListToolbar from "../../../components/ToolBar";
import DeleteModel from "../../../components/DeleteModel";
import { toast } from "react-toastify";


const Ratings = (props) => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [startIndex, setStartIndex] = useState(1);
  const [endIndex, setEndIndex] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItem] = useState();
  const [deleteShow, setDeleteShow] = useState(false);
  const [idToDelete, setIdToDelete] = useState("");
  
  

  const { data: RatingsData } = useGetRatingsQuery({
    page: currentPage,
    search: searchQuery,
  });

  const [deleteTrainerList] = useDeleteRatingsMutation();


  useEffect(() => {
    if (RatingsData && RatingsData.data) {
      setData(RatingsData.data);
      setStartIndex(RatingsData.pagination.startIndex);
      setCurrentPage(currentPage);
      setTotalItem(RatingsData.pagination.totalItems);
      setEndIndex(RatingsData.pagination.endIndex);
      setTotalPages(RatingsData.pagination.totalPages);
    }
  }, [RatingsData, currentPage]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleFilterClick = () => {
    console.log("Filter clicked");
  };

  const handleDownloadClick = () => {
    console.log("Download clicked");
  };

  const handleAddClick = () => {
    console.log("Add clicked");
  };

  const handleCloseClick = () => {
    setSearchQuery('');  
  };


  const deleteHandleShow = (id) => {
    setIdToDelete(id);
    setDeleteShow(true);
  };

  const deleteHandleClose = () => {
    setDeleteShow(false);
  };


  const handleDeleteDevices = async () => {
    try {
      const response = await deleteTrainerList({
        id: idToDelete,
      });
      setDeleteShow(false);
      setIdToDelete("");
      if (response?.data) {
        toast.success(response?.data?.message, { autoClose: 1000 });
      } else {
        toast.error(response?.error?.data.error, { autoClose: 1000 });
      }
    } catch (error) {
      console.error(error);
    }
  };

 

  const COLUMNS = [
    {
      Header: "ID",
      accessor: "s_no",
    },
    {
      Header: "Phone Number",
      accessor: "phoneNumber",
    },
    {
      Header: "Rating",
      accessor: "rating",
    },
    {
      Header: "Type Of User",
      accessor: "typeOfUser",
    },
   
    {
      Header: "Created At",
      accessor: "createdAt",
    },
    {
      Header: "Updated At",
      accessor: "updatedAt",
    },

    {
      Header: "ACTIONS",
      accessor: "action",
      Cell: ({ row }) => {
        const rowIdx = row.original._id;
        return (
          <div className="d-flex align-items-center justify-content-center flex-row">
            <FaRegTrashCan
              style={{ fontSize: "20px" }}
              onClick={() => deleteHandleShow(rowIdx)}
            />
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <Container fluid className="mt-3 reduced-width-row">
        <Header HEADING={"Ratings"} />
        <div>
          <UserListToolbar
            searchPlaceholder="Search TrainerList..."
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
        <DeleteModel
          YES={handleDeleteDevices}
          DELETESTATE={deleteShow}
          ONCLICK={deleteHandleClose}
          DESCRIPTION="Are you sure want to delete this Ratings"
          DELETETITLE="Ratings"
        />
      </Container>
    </div>
  );
};

export default Ratings;
