import axios from "axios";
const domain = process.env.REACT_APP_SMASHTRACK_DOMAIN;
const port = process.env.REACT_APP_SMASHTRACK_PORT;
const protocol = process.env.REACT_APP_SMASHTRACK_PROTOCOL;

const smashtrack = axios.create({
  baseURL: `${protocol}://${domain}:${port}`,
  withCredentials: true,
  params: {
    page: 0,
    pageSize: 50
  }
});

export default smashtrack;
