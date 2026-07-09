export interface City {
  code: string;
  name: string;
  airport?: string;
}

export const cities: City[] = [
  { code: "DEL", name: "Delhi", airport: "Indira Gandhi International" },
  { code: "BOM", name: "Mumbai", airport: "Chhatrapati Shivaji Maharaj" },
  { code: "BLR", name: "Bengaluru", airport: "Kempegowda International" },
  { code: "HYD", name: "Hyderabad", airport: "Rajiv Gandhi International" },
  { code: "MAA", name: "Chennai", airport: "Chennai International" },
  { code: "CCU", name: "Kolkata", airport: "Netaji Subhas Chandra Bose" },
  { code: "PNQ", name: "Pune", airport: "Pune Airport" },
  { code: "AMD", name: "Ahmedabad", airport: "Sardar Vallabhbhai Patel" },
  { code: "GOI", name: "Goa", airport: "Dabolim / Mopa" },
  { code: "JAI", name: "Jaipur", airport: "Jaipur International" },
  { code: "LKO", name: "Lucknow", airport: "Chaudhary Charan Singh" },
  { code: "COK", name: "Kochi", airport: "Cochin International" },
];

export interface FlightResult {
  id: string;
  airline: string;
  flightNo: string;
  depart: string;
  arrive: string;
  durationMin: number;
  stops: number;
  price: number;
}

/** Seed flight results shown after a mock search (fictional fares). */
export const flightResults: FlightResult[] = [
  { id: "f1", airline: "IndiGo", flightNo: "6E 2041", depart: "06:10", arrive: "08:25", durationMin: 135, stops: 0, price: 4899 },
  { id: "f2", airline: "Air India", flightNo: "AI 887", depart: "07:45", arrive: "09:55", durationMin: 130, stops: 0, price: 5230 },
  { id: "f3", airline: "Vistara", flightNo: "UK 951", depart: "09:20", arrive: "11:40", durationMin: 140, stops: 0, price: 5675 },
  { id: "f4", airline: "IndiGo", flightNo: "6E 555", depart: "12:05", arrive: "15:35", durationMin: 210, stops: 1, price: 4350 },
  { id: "f5", airline: "SpiceJet", flightNo: "SG 138", depart: "17:30", arrive: "19:45", durationMin: 135, stops: 0, price: 4590 },
  { id: "f6", airline: "Akasa Air", flightNo: "QP 1103", depart: "21:15", arrive: "23:30", durationMin: 135, stops: 0, price: 4120 },
];

export interface SpecialFare {
  id: string;
  label: string;
  note: string;
}

export const specialFares: SpecialFare[] = [
  { id: "regular", label: "Regular", note: "Standard fares" },
  { id: "student", label: "Student", note: "Extra baggage" },
  { id: "armed-forces", label: "Armed Forces", note: "Up to ₹600 off" },
  { id: "senior-citizen", label: "Senior Citizen", note: "Up to ₹600 off" },
];

export interface PopularRoute {
  id: string;
  from: string;
  to: string;
  price: number;
}

export const popularFlightRoutes: PopularRoute[] = [
  { id: "r1", from: "Delhi", to: "Mumbai", price: 4099 },
  { id: "r2", from: "Bengaluru", to: "Delhi", price: 4899 },
  { id: "r3", from: "Mumbai", to: "Goa", price: 2399 },
  { id: "r4", from: "Hyderabad", to: "Chennai", price: 2199 },
  { id: "r5", from: "Kolkata", to: "Delhi", price: 4499 },
  { id: "r6", from: "Pune", to: "Bengaluru", price: 2799 },
];

export interface BusRoute {
  id: string;
  from: string;
  to: string;
  operators: number;
  fareFrom: number;
}

export const popularBusRoutes: BusRoute[] = [
  { id: "b1", from: "Delhi", to: "Jaipur", operators: 48, fareFrom: 399 },
  { id: "b2", from: "Mumbai", to: "Pune", operators: 62, fareFrom: 349 },
  { id: "b3", from: "Bengaluru", to: "Chennai", operators: 54, fareFrom: 499 },
  { id: "b4", from: "Hyderabad", to: "Vijayawada", operators: 41, fareFrom: 449 },
  { id: "b5", from: "Delhi", to: "Manali", operators: 27, fareFrom: 899 },
  { id: "b6", from: "Ahmedabad", to: "Mumbai", operators: 38, fareFrom: 549 },
];

export const busOperators: string[] = [
  "Zingbus",
  "IntrCity SmartBus",
  "Orange Tours",
  "VRL Travels",
  "SRS Travels",
  "Neeta Tours",
  "Parveen Travels",
  "RSRTC",
];

export interface TrainInfo {
  id: string;
  number: string;
  name: string;
  from: string;
  to: string;
  departs: string;
  duration: string;
  classes: string[];
}

export const popularTrains: TrainInfo[] = [
  { id: "t1", number: "12951", name: "Mumbai Rajdhani", from: "Mumbai Central", to: "New Delhi", departs: "17:00", duration: "15h 32m", classes: ["1A", "2A", "3A"] },
  { id: "t2", number: "12301", name: "Howrah Rajdhani", from: "Howrah Jn", to: "New Delhi", departs: "16:55", duration: "17h 20m", classes: ["1A", "2A", "3A"] },
  { id: "t3", number: "12627", name: "Karnataka Express", from: "KSR Bengaluru", to: "New Delhi", departs: "19:20", duration: "39h 15m", classes: ["SL", "3A", "2A"] },
  { id: "t4", number: "12839", name: "Howrah Mail", from: "Howrah Jn", to: "Chennai Central", departs: "23:45", duration: "27h 50m", classes: ["SL", "3A", "2A", "1A"] },
  { id: "t5", number: "12002", name: "Shatabdi Express", from: "New Delhi", to: "Bhopal Jn", departs: "06:00", duration: "8h 35m", classes: ["CC", "EC"] },
];
