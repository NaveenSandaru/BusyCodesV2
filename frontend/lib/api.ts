import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";


export const askCV = (filename: string, question: string) =>
  axios.post(`${API_URL}/ask_cv`, { filename, question });

export const sendEmail = (to: string, subject: string, body: string) =>
  axios.post(`${API_URL}/send_email`, { to, subject, body });
