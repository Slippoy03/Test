import axios from "axios";

//contoh mengambil token dari local storage:
// const token = localStorage.getItem("token");
export const apiUrl = axios.create({
  baseURL: "api untuk ke backend",
  headers: {
    //masukan token local storage untuk autorisasi backend
    Authorization: `Bearer token`,
  },
});
