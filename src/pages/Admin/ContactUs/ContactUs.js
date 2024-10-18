import { Button, Container, Form, Modal, Row, Spinner } from "react-bootstrap";
import Header from "../../../components/Header";
import BasicTable from "../../../components/TablePaginationComponent";
import { useDeleteContactUsMutation, useEditContactUsMutation, useGetContactUsQuery } from "../../../redux/api/ContactUsApi";
import { useEffect, useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { LuPencil } from "react-icons/lu";
import UserListToolbar from "../../../components/ToolBar";
import DeleteModel from "../../../components/DeleteModel";
import { toast } from "react-toastify";

const ContactUs = (props) => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [startIndex, setStartIndex] = useState(1);
  const [endIndex, setEndIndex] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItem] = useState();
  const [editId, setEditId] = useState(null);
  const [editShow, setEditShow] = useState(false);
  const [status, setStatus] = useState("");
  const [adminComments, setAdminComments] = useState("");
  const [deleteShow, setDeleteShow] = useState(false);
  const [idToDelete, setIdToDelete] = useState("");
  const [loading, setLoading] = useState(false);

  const { data: ContactUsData , refetch} = useGetContactUsQuery({
    page: currentPage,
    search: searchQuery,
  });

  const [editContactUsData] = useEditContactUsMutation();
  const [deleteContactUs] = useDeleteContactUsMutation();


  console.log(ContactUsData);
  useEffect(() => {
    if (ContactUsData && ContactUsData.data) {
      setData(ContactUsData.data);
      setStartIndex(ContactUsData.pagination.startIndex);
      setCurrentPage(currentPage);
      setTotalItem(ContactUsData.pagination.totalItems);
      setEndIndex(ContactUsData.pagination.endIndex);
      setTotalPages(ContactUsData.pagination.totalPages);
    }
  }, [ContactUsData, currentPage]);

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


  const handleEditShow = (id) => {
    const editContactUs = data.find((d) => d._id === id);

    if (editContactUs) {
      setEditId(id);
      setStatus(editContactUs.status);
      setAdminComments(editContactUs.adminComments);
      setEditShow(true);
    }
  };

  const handleEditClose = () => {
    setEditShow(false);
    setEditId(null);
    setStatus("");
  };

  const deleteHandleShow = (id) => {
    setIdToDelete(id);
    setDeleteShow(true);
  };

  const deleteHandleClose = () => {
    setDeleteShow(false);
  };

  const handlEditStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleDeleteDevices = async () => {
    try {
      const response = await deleteContactUs({
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

  const handleEditData = async () => {
    if (!status || !adminComments) {
      toast.error("Please fill  the fields", { autoClose: 1000 });
      return;
    }

    setLoading(true);

    try {
      const data = {
        status: status,
        adminComments: adminComments,
      };

      const response = await editContactUsData({
        id: editId,
        data: data,
      });

      if (response.data) {
        toast.success(response.data.message, { autoClose: 1000 });
        setEditShow(false);
        refetch();
      } else {
        toast.error(response.error.data.error, { autoClose: 1000 });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
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
      Header: "Subject",
      accessor: "subject",
    },
    {
      Header: "Message",
      accessor: "message",
    },
    {
      Header: "Status",
      accessor: "status",
    },
    {
      Header: "Admin Comments",
      accessor: "adminComments",
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
            <LuPencil
              style={{ marginRight: "10px", fontSize: "20px" }}
              onClick={() => handleEditShow(rowIdx)}
            />
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
        <Header HEADING={"Contact Us"} />
        <div>
          <UserListToolbar
            searchPlaceholder="Search ContactUs..."
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
          DESCRIPTION="Are you sure want to delete this Contact Us"
          DELETETITLE="Contact Us"
        />
      </Container>
      <Modal
        show={editShow}
        onHide={handleEditClose}
        centered
        dialogClassName="all-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Contact Us</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Status Input Field */}
            <Form.Group controlId="deviceStatusInput" className="mb-3">
              <Form.Label>
                Status <span className="text-danger">*</span>
              </Form.Label>
              <Form.Select value={status} onChange={handlEditStatusChange}>
                <option value="">Select status</option>
                <option value="Completed">Completed</option>
                <option value="Pending">Pending</option>
                <option value="InProcess">In Process</option>
              </Form.Select>
            </Form.Group>

            {/* Admin Comments Input Field */}
            <Form.Group controlId="adminCommentsInput" className="mb-3">
              <Form.Label>Admin Comments</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={adminComments}
                onChange={(e) => setAdminComments(e.target.value)}
                placeholder="Add your comments here"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleEditClose}>
            Cancel
          </Button>
          <Button
            style={{ backgroundColor: "#003205", border: "none" }}
            onClick={handleEditData}
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="me-2"
                />
                Updating...
              </>
            ) : (
              "Update"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ContactUs;
