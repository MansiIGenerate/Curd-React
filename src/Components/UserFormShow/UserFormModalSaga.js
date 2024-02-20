import styled from "@emotion/styled";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  InputAdornment,
  Slide,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import {
  updateUserRequest,
  addUserRequest,
} from "../../Redux/Actions/userActionsData";
import "react-toastify/dist/ReactToastify.css";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const TextValidatorField = styled(TextValidator)(() => ({
  width: "100%",
  marginBottom: "16px",
}));

ValidatorForm.addValidationRule("namevalidationsrule", (value) => {
  return /^[a-zA-Z\s]*$/.test(value);
});

ValidatorForm.addValidationRule("emailvalidationsrule", (value) => {
  return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value);
});

function UserFormModalSaga({ open, handleClose, userData, handleUpdateData }) {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setdata] = useState({
    name: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    e.persist();
    setdata({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userData && userData._id) {
      dispatch(updateUserRequest({ _id: userData._id, ...data }));
    } else {
      dispatch(addUserRequest(data));
    }
    handleClose();
  };
  useEffect(() => {
    if (userData) {
      console.log("userData", userData);
      setdata({
        ...data,
        name: userData?.name,
        email: userData?.email,
        password: userData?.password,
        _id: userData?._id,
      });
    }
  }, [userData]);

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      fullWidth
      maxWidth="sm"
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{userData ? "Edit User" : "New User"}</DialogTitle>
      <DialogContent>
        <ValidatorForm
          onSubmit={handleSubmit}
          onError={() => null}
          autoComplete="off"
        >
          <Grid container spacing={8}>
            <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mt: 2 }}>
              <TextValidatorField
                type="text"
                name="name"
                id="standard-basic"
                value={data.name || ""}
                onChange={handleChange}
                validators={[
                  "required",
                  "minStringLength:3",
                  "maxStringLength:50",
                  "namevalidationsrule",
                ]}
                errorMessages={[
                  "this field is required",
                  "minimum length is 3",
                  "maximum length is 50",
                  "name is not use to number and special characters",
                ]}
                label=" Name "
              />
              <TextValidatorField
                type="email"
                name="email"
                id="standard-basic"
                value={data.email || ""}
                onChange={handleChange}
                validators={[
                  "required",
                  "isEmail",
                  "minStringLength:5",
                  "maxStringLength:50",
                  "emailvalidationsrule",
                ]}
                errorMessages={[
                  "this field is required",
                  "email is not valid",
                  "minimum length is 5",
                  "maximum length is 50",
                  "email is not use to special characters",
                ]}
                label="email"
              />

              <TextValidatorField
                name="password"
                label="Password"
                value={data.password || ""}
                onChange={handleChange}
                validators={["required", "minStringLength: 8"]}
                errorMessages={[
                  "This field is required",
                  "Password must be at least 8 characters long",
                ]}
                type={showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>

          <div className="container">
            <div className="row">
              <div className="col-sm-6 mb-2">
                <Button
                  color="error"
                  variant="contained"
                  type="button"
                  fullWidth
                  onClick={() => {
                    setdata("");
                  }}
                >
                  <DeleteIcon />
                  <span> Clear</span>
                </Button>
              </div>
              <div className="col-sm-6 mb-2">
                <Button
                  color="primary"
                  variant="contained"
                  type="submit"
                  fullWidth
                >
                  <SendIcon />
                  <span>{userData ? "Update Item" : "Add Item"}</span>
                </Button>
              </div>
            </div>
          </div>
        </ValidatorForm>
      </DialogContent>
    </Dialog>
  );
}

export default UserFormModalSaga;
