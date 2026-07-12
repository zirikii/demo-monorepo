export interface Airline {
  name: string;
  code: string;
  terminals: ("T1" | "T2" | "T3" | "T4")[];
}

/** Carriers operating from Changi (used to seed the mock flight board). */
export const airlines: Airline[] = [
  { name: "Singapore Airlines", code: "SQ", terminals: ["T2", "T3"] },
  { name: "Scoot", code: "TR", terminals: ["T1"] },
  { name: "Jetstar Asia", code: "3K", terminals: ["T1"] },
  { name: "Qantas", code: "QF", terminals: ["T1"] },
  { name: "Cathay Pacific", code: "CX", terminals: ["T4"] },
  { name: "Emirates", code: "EK", terminals: ["T1"] },
  { name: "Qatar Airways", code: "QR", terminals: ["T1"] },
  { name: "Malaysia Airlines", code: "MH", terminals: ["T2"] },
  { name: "Garuda Indonesia", code: "GA", terminals: ["T3"] },
  { name: "All Nippon Airways", code: "NH", terminals: ["T1"] },
  { name: "Japan Airlines", code: "JL", terminals: ["T1"] },
  { name: "Korean Air", code: "KE", terminals: ["T1"] },
  { name: "Thai Airways", code: "TG", terminals: ["T1"] },
  { name: "Vietnam Airlines", code: "VN", terminals: ["T4"] },
  { name: "Cebu Pacific", code: "5J", terminals: ["T4"] },
  { name: "China Airlines", code: "CI", terminals: ["T4"] },
  { name: "EVA Air", code: "BR", terminals: ["T1"] },
  { name: "Lufthansa", code: "LH", terminals: ["T2"] },
  { name: "British Airways", code: "BA", terminals: ["T1"] },
  { name: "Air New Zealand", code: "NZ", terminals: ["T1"] },
];
