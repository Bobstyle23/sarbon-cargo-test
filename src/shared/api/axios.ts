import axios from "axios";

export const api = axios.create({
  baseURL: "https://api.sarbon.me/v1",
  headers: {
    "X-Device-Type": "web",
    "X-Language": "uz",
    "X-Client-Token": process.env.NEXT_PUBLIC_CLIENT_TOKEN,
    "X-User-Token": process.env.NEXT_PUBLIC_USER_TOKEN,
  },
});
