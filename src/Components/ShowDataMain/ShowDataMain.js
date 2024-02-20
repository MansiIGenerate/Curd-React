import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { GridActionsCellItem } from "@mui/x-data-grid-pro";
import { Button, Card, Slide, Stack } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import { DataGrid } from "@mui/x-data-grid";
import UserFormModal from "../UserFormShow/UserFormModal";
import { useDispatch, useSelector } from "react-redux";
import {
  addUser,
  deleteUser,
  updateUser,
  setUsers,
} from "../../Redux/Reducers/userReducer";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ShowDataMain() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const [editRow, seteditRew] = useState(null);
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  console.log("daatat", users);

  const handleClose = () => {
    setOpen(false);
    seteditRew(null);
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
      getActions: (data) => {
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            onClick={() => handleEditClick(data)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => handleDeleteClick(data)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  const handleEditClick = (data) => {
    seteditRew(data);
    setOpen(true);
  };

  const handleSubmit = (userUpdatedData) => {
    if (editRow) {
      axios
        .put(
          `https://65c7118fe7c384aada6e2870.mockapi.io/mydata/mydata/${editRow.row._id}`,
          userUpdatedData
        )
        .then(() => {
          mydata();
          dispatch(updateUser(userUpdatedData));
          handleClose();
        });
    } else {
      axios
        .post(
          "https://65c7118fe7c384aada6e2870.mockapi.io/mydata/mydata",
          userUpdatedData
        )
        .then((e) => {
          mydata();
          dispatch(addUser(userUpdatedData));
          handleClose();
        });
    }
  };
  const handleDeleteClick = (data) => {
    Swal.fire({
      title: "Do you want to Delete?",
      showCancelButton: true,
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(
            `https://65c7118fe7c384aada6e2870.mockapi.io/mydata/mydata/${data.row._id}`
          )
          .then((r) => {
            mydata();
            alert("del");
            dispatch(deleteUser(data.row._id));
          })
          .catch((error) => {
            console.error("Error deleting data:", error);
          });
      }
    });
  };

  let mydata = () => {
    setLoading(true);
    axios
      .get("https://65c7118fe7c384aada6e2870.mockapi.io/mydata/mydata")
      .then((r) => {
        let d = r.data.map((val, index) => {
          val.id = index + 1;
          return val;
        });
        setRows(d);
        dispatch(setUsers(d));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    mydata();
  }, []);

  function CustomLoadingOverlay() {
    return loading ? <LinearProgress /> : null;
  }

  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="end" m={5}>
        <Button
          variant="contained"
          onClick={() => {
            // dispatch(addUser({ name: "ssssss", id: "11111" }));
            dispatch(addUser);
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
              rows={rows}
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
        <UserFormModal
          open={open}
          handleClose={handleClose}
          TransitionComponent={Transition}
          userData={editRow}
          mydata={() => mydata()}
          handleUpdateData={handleSubmit}
        />
      )}
    </>
  );
}
