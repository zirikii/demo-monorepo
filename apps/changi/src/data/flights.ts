import type { Flight } from "@/types";

export const flights: Flight[] = [
  { id: "SQ 306", time: "09:05", destination: "London", airline: "Singapore Airlines", terminal: "T3", status: "Boarding" },
  { id: "QF 036", time: "09:40", destination: "Melbourne", airline: "Qantas", terminal: "T1", status: "On time" },
  { id: "TR 808", time: "10:10", destination: "Tokyo", airline: "Scoot", terminal: "T1", status: "Delayed" },
  { id: "3K 671", time: "10:35", destination: "Penang", airline: "Jetstar Asia", terminal: "T4", status: "On time" },
  { id: "SQ 710", time: "11:20", destination: "Bangkok", airline: "Singapore Airlines", terminal: "T2", status: "On time" },
  { id: "CX 714", time: "12:05", destination: "Hong Kong", airline: "Cathay Pacific", terminal: "T4", status: "Boarding" },
  { id: "GA 855", time: "12:35", destination: "Surabaya", airline: "Garuda Indonesia", terminal: "T3", status: "Arrived" },
  { id: "ET 639", time: "13:10", destination: "Addis Ababa", airline: "Ethiopian Airlines", terminal: "T2", status: "On time" },
];
