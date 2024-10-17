import { Col, Container, Row } from "react-bootstrap";
import Header from "../../../components/Header";
import BasicTable from "../../../components/TablePaginationComponent";
import { useGetTrainerVideosQuery } from "../../../redux/api/TrainerVideosApi";
import { useEffect, useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { LuPencil } from "react-icons/lu";
import UserListToolbar from "../../../components/ToolBar";
import { useNavigate, useParams } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";

const TrainerVideos = (props) => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [startIndex, setStartIndex] = useState(1);
  const [endIndex, setEndIndex] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItem] = useState();
  const { phoneNumber } = useParams();

  const { data: TrainerVideosData } = useGetTrainerVideosQuery({
    page: currentPage,
    search: searchQuery,
    phoneNumber: phoneNumber,
  });
  const navigate = useNavigate();
  const handleCancel = () => {
    navigate('/admin/trainer-list');
  };


  console.log(TrainerVideosData);
  useEffect(() => {
    if (TrainerVideosData && TrainerVideosData.data) {
      setData(TrainerVideosData.data);
      setStartIndex(TrainerVideosData.pagination.startIndex);
      setCurrentPage(currentPage);
      setTotalItem(TrainerVideosData.pagination.totalItems);
      setEndIndex(TrainerVideosData.pagination.endIndex);
      setTotalPages(TrainerVideosData.pagination.totalPages);
    }
  }, [TrainerVideosData, currentPage]);

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

  const COLUMNS = [
    {
      Header: "ID",
      accessor: "s_no",
    },

    {
        Header: "Video",
        accessor: "video", 
        Cell: ({ row }) => {
          const videoUrl = row.original.video; 
          return (
            <video width="100" height="60" controls>
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          );
        },
      },
    {
        Header: "Title",
        accessor: "title",
      },
    {
      Header: "Uploader Name",
      accessor: "uploaderName",
    },
    {
      Header: "Uploaded By",
      accessor: "uploadedBy",
    },
    {
      Header: "Views",
      accessor: "views",
    },
    {
      Header: "Type Of Video",
      accessor: "typeOfVideo",
    },

    {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Duration",
        accessor: "duration",
      },
      {
        Header: "Price",
        accessor: "price",
      },
      {
        Header: "Status",
        accessor: "status",
      },
    {
      Header: "Created At",
      accessor: "createdAt",
    },
    {
      Header: "Updated At",
      accessor: "updatedAt",
    },
    // {
    //   Header: "ACTIONS",
    //   accessor: "action",
    //   Cell: () => {
    //     return (
    //       <div className="d-flex align-items-center justify-content-center flex-row">
    //         <LuPencil style={{ marginRight: "10px", fontSize: "20px" }} />
    //         <FaRegTrashCan style={{ fontSize: "20px" }} />
    //       </div>
    //     );
    //   },
    // },
  ];

  return (
    <div>
      <Container fluid className="mt-3 reduced-width-row">
        <Col className="d-flex justify-content-start mb-3 mt-3">
          <h4 onClick={handleCancel} style={{ marginTop: "34px" }}>
            <AiOutlineArrowLeft />
          </h4>
          <Header HEADING={"Videos Uploaded By Trainer Name"} />
        </Col>
        <div>
          <UserListToolbar
            searchPlaceholder="Search TrainerVideos..."
            onSearchChange={handleSearchChange}
            onPageChange={handlePageChange}
            onFilterClick={handleFilterClick}
            onDownloadClick={handleDownloadClick}
            onSortClick={handleAddClick}
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

export default TrainerVideos;
