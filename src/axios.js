import axios from "axios";

export const instance = axios.create({
  baseURL:
    "https://v1kvoifffg.execute-api.us-east-1.amazonaws.com/musicappstage",
});
