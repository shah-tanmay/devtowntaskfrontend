import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../axiosInstance";
import { Alert, Snackbar } from "@mui/material";
import Toast from "../Toast";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassoword] = useState();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState();
  const [severity, setSeverity] = useState();
  const navigate = useNavigate();
  const handleClose = () => {
    setOpen(false);
  };
  const login = () => {
    if (!email || !password) {
      setOpen(true);
      setMessage("Both Feilds are  mandatory");
      setSeverity("error");
    } else {
      axios
        .post("/login", {
          email,
          password,
        })
        .then((response) => {
          const token = response.data.token;
          const email = response.data.user.email;
          const id = response.data.user._id;
          localStorage.setItem("token", token);
          localStorage.setItem("email", email);
          localStorage.setItem("id", id);
          setOpen(true);
          navigate("bill");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const signup = () => {
    if (!email || !password) {
      setOpen(true);
      setMessage("Both Feilds are  mandatory");
      setSeverity("error");
    } else {
      axios
        .post("/signup", {
          email,
          password,
        })
        .then((response) => {
          const token = response.data.token;
          const email = response.data.user.email;
          localStorage.setItem("token", token);
          localStorage.setItem("email", email);
          navigate("bill");
        })
        .catch((error) => {
          console.log(error.response.data);
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
      sx={{ minWidth: 400, minHeight: "100vh" }}
    >
      <Toast
        open={open}
        handleClose={handleClose}
        text={message}
        severity={severity}
      />
      <Card sx={{ minWidth: 400, bgcolor: "white" }}>
        <CardContent>
          <Typography variant="h5">Greetings</Typography>
          <Grid container direction="column" marginTop={3} gap={1}>
            <TextField
              required
              id="outlined-required"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              required
              id="outlined-required"
              label="Password"
              value={password}
              onChange={(e) => setPassoword(e.target.value)}
              type="password"
            />
            <Grid container direction="row">
              <Button size="large" onClick={login}>
                Login
              </Button>
              <Button onClick={signup}>SignUp</Button>
              <Link
                to="/forgot"
                style={{
                  marginTop: "2px",
                  marginLeft: "auto",
                  textDecoration: "none",
                }}
              >
                <Button>Forgot Password</Button>
              </Link>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Login;
