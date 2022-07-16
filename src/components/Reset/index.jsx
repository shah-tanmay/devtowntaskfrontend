import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "../../axiosInstance";
import Toast from "../Toast";

const Reset = () => {
  const [password, setPassoword] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState();
  const [severity, setSeverity] = useState();
  const navigate = useNavigate();
  const handleClose = () => {
    setOpen(false);
  };
  const reset = () => {
    if (!password) {
      setOpen(true);
      setMessage("Password is Required");
      setSeverity("error");
    } else {
      const token = searchParams.get("token");
      axios
        .put("/resetpassword", {
          token,
          password,
        })
        .then((response) => {
          if (response.data.success) {
            navigate("/");
          }
        })
        .catch((error) => {
          console.log(error);
          setOpen(false);
          setMessage("Some Error Occured");
          setSeverity("error");
        });
    }
  };
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{ minWidth: 400, minHeight: "80vh" }}
    >
      <Toast
        open={open}
        handleClose={handleClose}
        text={message}
        severity={severity}
      />
      <Card sx={{ minWidth: 400, bgcolor: "white" }}>
        <CardContent>
          <Typography variant="h5">Reset Passoword</Typography>
          <Grid container direction="column" marginTop={3} gap={1}>
            <TextField
              required
              id="outlined-required"
              label="New Password"
              value={password}
              onChange={(e) => setPassoword(e.target.value)}
              type="password"
            />
            <Grid container direction="row">
              <Button size="large" onClick={reset}>
                Submit
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Reset;
