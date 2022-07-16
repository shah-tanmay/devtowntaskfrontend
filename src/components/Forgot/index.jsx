import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import axios from "../../axiosInstance";
import Toast from "../Toast";

const Forgot = () => {
  const [email, setEmail] = useState();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState();
  const [severity, setSeverity] = useState();
  const handleClose = () => {
    setOpen(false);
  };
  const data = {
    email: email,
  };
  const reset = () => {
    if (!email) {
      setOpen(true);
      setMessage("Email is Required");
      setSeverity("error");
    } else {
      axios
        .post("/forgetpassword", data)
        .then((response) => {
          console.log(response.data);
          setOpen(true);
          setMessage("Mail Sent Succesfully");
          setSeverity("success");
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
          <Typography variant="h5">Reset Password</Typography>
          <Grid container direction="column" marginTop={3} gap={1}>
            <TextField
              required
              id="outlined-required"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Grid container direction="row">
              <Button size="large" onClick={reset}>
                Reset
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Forgot;
