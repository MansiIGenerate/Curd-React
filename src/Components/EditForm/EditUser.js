import {
  Button,
  Grid,
  styled,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useEffect, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
// import { TextValidatorField } from "../CommanFile/TextValidatorComponents";
import "../CommanFile/ValidationRules";
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

const EditUser = (props) => {
  // console.log({ ...props.editrow.row });
  const [showPassword, setShowPassword] = useState(false);
  const [data, setdata] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    setdata({ ...props.editrow.row });
  }, [props.editrow.row]);

  const handleChange = (e) => {
    e.persist();
    setdata({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e, _id) => {
    e.preventDefault();
    console.log("update ===>", data._id);
    axios
      .put(
        `https://65c7118fe7c384aada6e2870.mockapi.io/mydata/mydata/${data._id}`,
        data
      )
      .then((r) => {
        props.mydata();
        props.handleClose();
      });

    // setdata((e.target.value = ""));
    setdata({ name: "", email: "", password: "" });
  };

  return (
    <div>
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
                color="primary"
                variant="contained"
                type="submit"
                fullWidth
              >
                <SendIcon />
                <span> Update Item</span>
              </Button>
            </div>
          </div>
        </div>
      </ValidatorForm>
    </div>
  );
};

export default EditUser;
