import * as React from "react";
import { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  Button,
  Grid,
  styled,
  InputAdornment,
  IconButton,
  Stack,
  Slide,
} from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import axios from "axios";

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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function UserForm(props) {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setdata] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (props.editrow) {
      setdata({ ...props.editrow.row });
    }
  }, [props.editrow]);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    e.persist();
    setdata({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (props.editrow) {
      axios
        .put(
          `https://65c7118fe7c384aada6e2870.mockapi.io/mydata/mydata/${data._id}`,
          data
        )
        .then((r) => {
          props.mydata();
          handleClose();
        });
    } else {
      axios
        .post("https://65c7118fe7c384aada6e2870.mockapi.io/mydata/mydata", data)
        .then((e) => {
          props.mydata();
          handleClose();
        });
    }
    setdata({ name: "", email: "", password: "" });
  };

  return (
    <div>
      <Stack direction="row" alignItems="center" justifyContent="end" m={5}>
        <Button variant="contained" onClick={handleClickOpen}>
          {props.editrow ? "Edit User" : "New User"}
        </Button>
      </Stack>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        fullWidth
        maxWidth="sm"
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{props.editrow ? "Edit User" : "New User"}</DialogTitle>
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
                    <span>{props.editrow ? "Update Item" : "Add Item"}</span>
                  </Button>
                </div>
              </div>
            </div>
          </ValidatorForm>
        </DialogContent>
      </Dialog>
    </div>
  );
}
