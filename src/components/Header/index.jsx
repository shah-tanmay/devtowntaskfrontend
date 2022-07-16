import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "../../axiosInstance";
const Header = () => {
  const navigate = useNavigate();
  const logout = () => {
    const token = localStorage.getItem("token");
    axios
      .post(
        "/logout",
        {},
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((response) => {
        if (response.data.success) {
          localStorage.clear();
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error.response.data.error);
      });
  };
  return (
    <div>
      <Box sx={{ flexGrow: 1 }} width="100vw">
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Billing System
            </Typography>
            <Button color="inherit" onClick={logout}>
              LOGOUT
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
};

export default Header;
