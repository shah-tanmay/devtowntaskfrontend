import axios from "axios";

export default axios.create({
  baseURL: `https://taskdevtown.herokuapp.com`,
});
