import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { GridActionsCellItem } from "@mui/x-data-grid-pro";
import { Button, Card, Slide, Stack } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import UserFormModalSaga from "../UserFormShow/UserFormModalSaga";
import { useDispatch, useSelector } from "react-redux";
import {
  clearEditRow,
  setEditRow,
  fetchUsersRequest,
  deleteUserRequest,
} from "../../Redux/Actions/userActionsData";
import "react-toastify/dist/ReactToastify.css";
import CircularProgress from "@mui/material/CircularProgress";
import Swal from "sweetalert2";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ShowDataMainSaga(handleSubmit) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  // const users = useSelector((state) => state.users || []);
  const loading = useSelector((state) => state.Loading);
  const editRow = useSelector((state) => state.editRow);
  const rowdata = useSelector((state) => state.rowData);
  const handleClose = () => {
    setOpen(false);
    dispatch(clearEditRow());
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 180 },
    { field: "name", headerName: "Name", width: 180 },
    { field: "email", headerName: "Email", width: 180 },
    { field: "password", headerName: "Password", width: 250 },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ row }) => {
        // console.log("data::::::::::", row);
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            onClick={() => handleEditClick(row)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => handleDeleteClick(row._id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  const handleEditClick = (data) => {
    dispatch(setEditRow(data));
    setOpen(true);
  };

  useEffect(() => {
    dispatch(fetchUsersRequest());
  }, [dispatch]);

  const handleDeleteClick = (userId) => {
    Swal.fire({
      title: "Do you want to Delete?",
      showCancelButton: true,
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteUserRequest(userId));
      }
    });
  };
  const CustomLoadingOverlay = () => {
    return (
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 9999,
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <CircularProgress />
          <p>Loading...</p>
        </div>
      </div>
    );
  };

  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="end" m={5}>
        <Button
          variant="contained"
          onClick={() => {
            setOpen(true);
          }}
        >
          New User
        </Button>
      </Stack>
      {loading ? <CustomLoadingOverlay /> : null}
      <div style={{ margin: "auto", width: "80%", marginTop: "50px" }}>
        <Card
          style={{ height: 500, width: "100%", backgroundColor: "#ffffff" }}
          sx={{ boxShadow: 3, borderRadius: "16px" }}
        >
          <DataGrid
            rows={rowdata}
            columns={columns}
            pageSize={5}
            getRowId={(row) => row._id}
            rowsPerPageOptions={[10]}
            loading={loading}
            components={{
              LoadingOverlay: CustomLoadingOverlay,
            }}
          />
        </Card>
      </div>

      {open && (
        <UserFormModalSaga
          open={open}
          handleClose={handleClose}
          TransitionComponent={Transition}
          userData={editRow}
          handleUpdateData={handleSubmit}
        />
      )}
    </>
  );
}
