import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { GridActionsCellItem } from "@mui/x-data-grid-pro";
import { Button, Card, Slide, Stack } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import { DataGrid } from "@mui/x-data-grid";
import UserFormModalSaga from "../UserFormShow/UserFormModalSaga";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsers,
  addUser,
  updateUser,
  deleteUser,
  clearEditRow,
  setEditRow,
  setrowdata,
} from "../../Redux/Actions/userActionsData";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ShowDataMainSaga(handleSubmit) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users || []);
  const loading = useSelector((state) => state.loading);
  const editRow = useSelector((state) => state.editRow);
  const rowdata = useSelector((state) => state.row);
  console.log("rowdata", rowdata);

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
        console.log("data::::::::::", row);
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            key={`edit-${row._id}`}
            label="Edit"
            onClick={() => handleEditClick(row._id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            key={`delete-${row._id}`}
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
    dispatch(fetchUsers());
    // dispatch(setrowdata());
  }, [dispatch]);

  // const handleDeleteClick = (data) => {
  //   // dispatch(deleteUser(data.row._id));
  //   dispatch(deleteUser(data));
  // };

  const handleDeleteClick = (userId) => {
    dispatch(deleteUser(userId));
  };
  function CustomLoadingOverlay() {
    return loading ? <LinearProgress /> : null;
  }

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
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <img src="/loader.gif" alt="" />
        </div>
      ) : (
        <div style={{ margin: "auto", width: "80%", marginTop: "50px" }}>
          <Card
            style={{ height: 500, width: "100%", backgroundColor: "#ffffff" }}
            sx={{ boxShadow: 3, borderRadius: "16px" }}
          >
            <DataGrid
              rows={rowdata}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[10]}
              loading={loading}
              components={{
                LoadingOverlay: CustomLoadingOverlay,
              }}
            />
          </Card>
        </div>
      )}
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
