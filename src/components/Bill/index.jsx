import {
  AppBar,
  Button,
  Card,
  CardContent,
  Grid,
  MenuItem,
  Pagination,
  Select,
  Toolbar,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "../../axiosInstance";
import { generateBills } from "../../helpers";
import Header from "../Header";
import Toast from "../Toast";
const Bill = () => {
  const email = localStorage.getItem("email");
  const token = localStorage.getItem("token");
  const [bills, setBills] = useState([]);
  const [fetch, setFetch] = useState(false);
  const [page, setPage] = useState();
  const [skip, setSkip] = useState(0);
  const [filter, setFilter] = useState("amount");
  const [id, setId] = useState();
  const [open, setOpen] = useState();
  const [message, setMessage] = useState();
  const [severity, setSeverity] = useState();
  const handleClose = () => {
    setOpen(false);
  };
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };
  const handlePageChange = (event, value) => {
    setPage(value);
    setSkip((value - 1) * 5);
  };
  const generateFakeBillData = () => {
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const fakeBills = generateBills(id);
    fakeBills.forEach((bill) => {
      const data = bill;
      axios
        .post("/bill", data, config)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => console.log(error));
    });
    setFetch(!fetch);
  };
  useEffect(() => {
    const getBills = () => {
      axios
        .get(`getBill/?skip=${skip}&sortBy=${filter}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setBills(response.data.bills);
          setId(response.data.id);
          let count = response.data.count;
          count % 5 == 0
            ? (count = count / 5)
            : (count = Math.floor(count / 5) + 1);
          setPage(count);
        })
        .catch((error) => {
          console.log(error);
          setOpen(false);
          setMessage("Some Error Occured");
          setSeverity("error");
        });
    };
    getBills();
  }, [skip, filter, fetch]);
  return (
    <div>
      <Header email={email} />
      <Toast
        open={open}
        handleClose={handleClose}
        text={message}
        severity={severity}
      />
      <Grid container direction="row" gap={2} marginTop={5}>
        <Typography textAlign="center" variant="h4">
          Filter According To:-{" "}
        </Typography>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={filter}
          label="Filters"
          onChange={handleFilterChange}
        >
          <MenuItem value="amount">Amount</MenuItem>
          <MenuItem value="unitsConsumed">Units Consumed</MenuItem>
          <MenuItem value="dueDate">Due Date</MenuItem>
          <MenuItem value="pendingAmount">Pending Amount</MenuItem>
        </Select>
        <Button onClick={generateFakeBillData}>Generate Fake Bill Data </Button>
      </Grid>
      <Grid container direction="row" gap={2}>
        {bills.map((bill) => {
          return (
            <div>
              <Card sx={{ minWidth: "500px", maxWidth: "500px" }}>
                <CardContent>
                  <Typography variant="h6">Title: {bill.title}</Typography>
                  <Typography variant="h6">Amount: {bill.amount}</Typography>
                  <Typography variant="h6">
                    Untis Consumed: {bill.unitsConsumed}
                  </Typography>
                  <Typography variant="h6">
                    Due Date: {new Date(bill.dueDate).toString()}
                  </Typography>
                  <Typography variant="h6">
                    Pending Amount: {bill.pendingAmount}
                  </Typography>
                </CardContent>
              </Card>
            </div>
          );
        })}
      </Grid>
      {page > 0 && (
        <Grid container justifyContent="center" marginTop={3} page={page}>
          <Pagination count={page} onChange={handlePageChange} />
        </Grid>
      )}
    </div>
  );
};

export default Bill;
