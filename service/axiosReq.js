import axios from "axios";

export default axios.create({
  baseURL: process.env.NEXT_PUBLIC_HOST_API,
  // baseURL: 'http://localhost:8001/',
  headers: {
    "Content-type": "application/json"
  }
});