import React, { useEffect, useRef, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import axios from "axios";
import Swal from "sweetalert2";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { GridActionsCellItem } from "@mui/x-data-grid-pro";
import { Card, DialogTitle, Slide, CircularProgress } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import { DataGrid, GridOverlay } from "@mui/x-data-grid";
import UserForm from "./UserForm";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ShowData() {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(true);
  const [isEdit, setIsEdit] = useState(true);
  const [editRow, seteditRew] = useState(false);
  const [rows, setRows] = useState([]);

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
            onClick={() => {
              handleEditClick(data);
            }}
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
    setOpen(true);
    seteditRew(data);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteClick = (data) => {
    console.log("delete", data.row._id);
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
      <UserForm mydata={() => mydata()} />

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
    </>
  );
}
