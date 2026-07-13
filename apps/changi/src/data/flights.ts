export type FlightDirection = "arrival" | "departure";
export type FlightStatus = "On Time" | "Boarding" | "Landed" | "Delayed" | "Gate Closed" | "Departed";
export type Flight = {
  id: string;
  flightNo: string;
  airline: string;
  airlineCode: string;
  city: string;
  direction: FlightDirection;
  scheduled: string;
  terminal: string;
  gate: string;
  status: FlightStatus;
  aircraft: string;
};

export const flights: Flight[] = 
[
  {
    "id": "fl-01",
    "flightNo": "SQ100",
    "airline": "Singapore Airlines",
    "airlineCode": "SQ",
    "city": "Sydney",
    "direction": "arrival",
    "scheduled": "06:00",
    "terminal": "1",
    "gate": "A1",
    "status": "On Time",
    "aircraft": "A350"
  },
  {
    "id": "fl-02",
    "flightNo": "QF107",
    "airline": "Qantas",
    "airlineCode": "QF",
    "city": "Melbourne",
    "direction": "departure",
    "scheduled": "11:13",
    "terminal": "2",
    "gate": "B2",
    "status": "Boarding",
    "aircraft": "B787"
  },
  {
    "id": "fl-03",
    "flightNo": "BA114",
    "airline": "British Airways",
    "airlineCode": "BA",
    "city": "London",
    "direction": "arrival",
    "scheduled": "16:26",
    "terminal": "3",
    "gate": "A3",
    "status": "Landed",
    "aircraft": "A380"
  },
  {
    "id": "fl-04",
    "flightNo": "NH121",
    "airline": "ANA",
    "airlineCode": "NH",
    "city": "Tokyo",
    "direction": "departure",
    "scheduled": "21:39",
    "terminal": "4",
    "gate": "B4",
    "status": "Delayed",
    "aircraft": "B777"
  },
  {
    "id": "fl-05",
    "flightNo": "CX128",
    "airline": "Cathay Pacific",
    "airlineCode": "CX",
    "city": "Bangkok",
    "direction": "arrival",
    "scheduled": "10:52",
    "terminal": "1",
    "gate": "A5",
    "status": "Gate Closed",
    "aircraft": "A321"
  },
  {
    "id": "fl-06",
    "flightNo": "EK135",
    "airline": "Emirates",
    "airlineCode": "EK",
    "city": "Hong Kong",
    "direction": "departure",
    "scheduled": "15:05",
    "terminal": "2",
    "gate": "B6",
    "status": "Departed",
    "aircraft": "A350"
  },
  {
    "id": "fl-07",
    "flightNo": "QR142",
    "airline": "Qatar Airways",
    "airlineCode": "QR",
    "city": "Jakarta",
    "direction": "arrival",
    "scheduled": "20:18",
    "terminal": "3",
    "gate": "A7",
    "status": "On Time",
    "aircraft": "B787"
  },
  {
    "id": "fl-08",
    "flightNo": "TG149",
    "airline": "Thai Airways",
    "airlineCode": "TG",
    "city": "Perth",
    "direction": "departure",
    "scheduled": "09:31",
    "terminal": "4",
    "gate": "B8",
    "status": "Boarding",
    "aircraft": "A380"
  },
  {
    "id": "fl-09",
    "flightNo": "GA156",
    "airline": "Garuda Indonesia",
    "airlineCode": "GA",
    "city": "Dubai",
    "direction": "arrival",
    "scheduled": "14:44",
    "terminal": "1",
    "gate": "A9",
    "status": "Landed",
    "aircraft": "B777"
  },
  {
    "id": "fl-10",
    "flightNo": "MH163",
    "airline": "Malaysia Airlines",
    "airlineCode": "MH",
    "city": "Paris",
    "direction": "departure",
    "scheduled": "19:57",
    "terminal": "2",
    "gate": "B10",
    "status": "Delayed",
    "aircraft": "A321"
  },
  {
    "id": "fl-11",
    "flightNo": "JL170",
    "airline": "Japan Airlines",
    "airlineCode": "JL",
    "city": "Seoul",
    "direction": "arrival",
    "scheduled": "08:10",
    "terminal": "3",
    "gate": "A11",
    "status": "Gate Closed",
    "aircraft": "A350"
  },
  {
    "id": "fl-12",
    "flightNo": "AF177",
    "airline": "Air France",
    "airlineCode": "AF",
    "city": "Manila",
    "direction": "departure",
    "scheduled": "13:23",
    "terminal": "4",
    "gate": "B12",
    "status": "Departed",
    "aircraft": "B787"
  },
  {
    "id": "fl-13",
    "flightNo": "SQ184",
    "airline": "Singapore Airlines",
    "airlineCode": "SQ",
    "city": "Denpasar",
    "direction": "arrival",
    "scheduled": "18:36",
    "terminal": "1",
    "gate": "A13",
    "status": "On Time",
    "aircraft": "A380"
  },
  {
    "id": "fl-14",
    "flightNo": "QF191",
    "airline": "Qantas",
    "airlineCode": "QF",
    "city": "Shanghai",
    "direction": "departure",
    "scheduled": "07:49",
    "terminal": "2",
    "gate": "B14",
    "status": "Boarding",
    "aircraft": "B777"
  },
  {
    "id": "fl-15",
    "flightNo": "BA198",
    "airline": "British Airways",
    "airlineCode": "BA",
    "city": "Frankfurt",
    "direction": "arrival",
    "scheduled": "12:02",
    "terminal": "3",
    "gate": "A15",
    "status": "Landed",
    "aircraft": "A321"
  },
  {
    "id": "fl-16",
    "flightNo": "NH205",
    "airline": "ANA",
    "airlineCode": "NH",
    "city": "Auckland",
    "direction": "departure",
    "scheduled": "17:15",
    "terminal": "4",
    "gate": "B16",
    "status": "Delayed",
    "aircraft": "A350"
  },
  {
    "id": "fl-17",
    "flightNo": "CX212",
    "airline": "Cathay Pacific",
    "airlineCode": "CX",
    "city": "Sydney",
    "direction": "arrival",
    "scheduled": "06:28",
    "terminal": "1",
    "gate": "A17",
    "status": "Gate Closed",
    "aircraft": "B787"
  },
  {
    "id": "fl-18",
    "flightNo": "EK219",
    "airline": "Emirates",
    "airlineCode": "EK",
    "city": "Melbourne",
    "direction": "departure",
    "scheduled": "11:41",
    "terminal": "2",
    "gate": "B18",
    "status": "Departed",
    "aircraft": "A380"
  },
  {
    "id": "fl-19",
    "flightNo": "QR226",
    "airline": "Qatar Airways",
    "airlineCode": "QR",
    "city": "London",
    "direction": "arrival",
    "scheduled": "16:54",
    "terminal": "3",
    "gate": "A19",
    "status": "On Time",
    "aircraft": "B777"
  },
  {
    "id": "fl-20",
    "flightNo": "TG233",
    "airline": "Thai Airways",
    "airlineCode": "TG",
    "city": "Tokyo",
    "direction": "departure",
    "scheduled": "21:07",
    "terminal": "4",
    "gate": "B20",
    "status": "Boarding",
    "aircraft": "A321"
  },
  {
    "id": "fl-21",
    "flightNo": "GA240",
    "airline": "Garuda Indonesia",
    "airlineCode": "GA",
    "city": "Bangkok",
    "direction": "arrival",
    "scheduled": "10:20",
    "terminal": "1",
    "gate": "A1",
    "status": "Landed",
    "aircraft": "A350"
  },
  {
    "id": "fl-22",
    "flightNo": "MH247",
    "airline": "Malaysia Airlines",
    "airlineCode": "MH",
    "city": "Hong Kong",
    "direction": "departure",
    "scheduled": "15:33",
    "terminal": "2",
    "gate": "B2",
    "status": "Delayed",
    "aircraft": "B787"
  },
  {
    "id": "fl-23",
    "flightNo": "JL254",
    "airline": "Japan Airlines",
    "airlineCode": "JL",
    "city": "Jakarta",
    "direction": "arrival",
    "scheduled": "20:46",
    "terminal": "3",
    "gate": "A3",
    "status": "Gate Closed",
    "aircraft": "A380"
  },
  {
    "id": "fl-24",
    "flightNo": "AF261",
    "airline": "Air France",
    "airlineCode": "AF",
    "city": "Perth",
    "direction": "departure",
    "scheduled": "09:59",
    "terminal": "4",
    "gate": "B4",
    "status": "Departed",
    "aircraft": "B777"
  },
  {
    "id": "fl-25",
    "flightNo": "SQ268",
    "airline": "Singapore Airlines",
    "airlineCode": "SQ",
    "city": "Dubai",
    "direction": "arrival",
    "scheduled": "14:12",
    "terminal": "1",
    "gate": "A5",
    "status": "On Time",
    "aircraft": "A321"
  },
  {
    "id": "fl-26",
    "flightNo": "QF275",
    "airline": "Qantas",
    "airlineCode": "QF",
    "city": "Paris",
    "direction": "departure",
    "scheduled": "19:25",
    "terminal": "2",
    "gate": "B6",
    "status": "Boarding",
    "aircraft": "A350"
  },
  {
    "id": "fl-27",
    "flightNo": "BA282",
    "airline": "British Airways",
    "airlineCode": "BA",
    "city": "Seoul",
    "direction": "arrival",
    "scheduled": "08:38",
    "terminal": "3",
    "gate": "A7",
    "status": "Landed",
    "aircraft": "B787"
  },
  {
    "id": "fl-28",
    "flightNo": "NH289",
    "airline": "ANA",
    "airlineCode": "NH",
    "city": "Manila",
    "direction": "departure",
    "scheduled": "13:51",
    "terminal": "4",
    "gate": "B8",
    "status": "Delayed",
    "aircraft": "A380"
  }
];
