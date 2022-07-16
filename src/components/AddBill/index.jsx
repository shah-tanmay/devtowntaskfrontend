import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../axiosInstance";
import Toast from "../Toast";

const AddBill = () => {
  const [title, setTitle] = useState();
  const [amount, setAmount] = useState();
  const [date, setDate] = useState();
  const [units, setUnits] = useState();
  const [pendingAmount, setPendingAmount] = useState();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState();
  const [severity, setSeverity] = useState();
  const submitBill = () => {
    if (!title || !amount || !date || !units || !pendingAmount) {
      setOpen(true);
      setMessage("Please fill are required fields");
      setSeverity("error");
    } else {
      const owner = localStorage.getItem("id");
      const token = localStorage.getItem("token");
      setDate(new Date(date).toString());
      axios
        .post(
          "/bill",
          {
            title,
            amount,
            dueDate: date,
            unitsConsumed: units,
            pendingAmount,
            owner,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          if (response.status === 201) {
            setOpen(true);
            setMessage("Bill Added Succesfully");
            setSeverity("success");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const handleClose = () => {
    setOpen(false);
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
          <Typography variant="h5">Add Bill</Typography>
          <Grid container direction="column" marginTop={3} gap={1}>
            <TextField
              required
              id="outlined-required"
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              required
              id="outlined-required"
              label="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              type="number"
            />
            <TextField
              required
              id="outlined-required"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              type="date"
            />
            <TextField
              required
              id="outlined-required"
              label="Units Consumed"
              value={units}
              onChange={(e) => setUnits(e.target.value)}
              type="number"
            />
            <TextField
              required
              id="outlined-required"
              label="Pending Amount"
              value={pendingAmount}
              onChange={(e) => setPendingAmount(e.target.value)}
              type="number"
            />
            <Grid container direction="row" marginLeft="auto">
              <Button size="large" onClick={submitBill}>
                ADD BILL
              </Button>
              <Link
                to="/bill"
                style={{
                  marginTop: "2px",
                  marginLeft: "auto",
                  textDecoration: "none",
                }}
              >
                <Button size="large">GO BACK</Button>
              </Link>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default AddBill;
