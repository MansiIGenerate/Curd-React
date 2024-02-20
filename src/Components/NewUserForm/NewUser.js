import * as React from "react";
import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  Button,
  Grid,
  styled,
  Stack,
  InputAdornment,
  IconButton,
} from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import axios from "axios";

const TextField = styled(TextValidator)(() => ({
  width: "100%",
  marginBottom: "16px",
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function NewUser(props) {
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [data, setdata] = useState({
    name: "",
    email: "",
    password: "",
  });

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
    axios
      .post("https://65c7118fe7c384aada6e2870.mockapi.io/mydata/mydata", data)
      .then((e) => {
        console.log(e.data);
        props.mydata();
      });
    setdata((e.target.value = ""));
    handleClose();
  };

  return (
    <div>
      <Stack direction="row" alignItems="center" justifyContent="end" m={5}>
        <Button variant="contained" onClick={handleClickOpen}>
          New User
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
        <DialogTitle>User Form</DialogTitle>
        <DialogContent>
          <div>
            <ValidatorForm
              onSubmit={handleSubmit}
              onError={() => null}
              autoComplete="off"
            >
              <Grid container spacing={8}>
                <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mt: 2 }}>
                  <TextField
                    type="text"
                    name="name"
                    id="standard-basic"
                    value={data.name || ""}
                    onChange={handleChange}
                    errorMessages={["this field is required"]}
                    label=" Name "
                    validators={["required"]}
                  />
                  <TextField
                    type="email"
                    name="email"
                    id="standard-basic"
                    value={data.email || ""}
                    onChange={handleChange}
                    validators={["required", "isEmail"]}
                    errorMessages={[
                      "this field is required",
                      "email is not valid",
                    ]}
                    label="email"
                  />
                  <TextField
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
                      type="submit"
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
                      <span>Add Item</span>
                    </Button>
                  </div>
                </div>
              </div>
            </ValidatorForm>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
