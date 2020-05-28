import axios from "axios";

const instance = axios.create({
  baseURL: "https://inex-a217d.firebaseio.com/",
});

export default instance;
