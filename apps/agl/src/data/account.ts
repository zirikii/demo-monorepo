export type ServiceKind = "electricity" | "gas" | "internet" | "mobile";

export type Service = {
  id: string;
  kind: ServiceKind;
  name: string;
  plan: string;
  accountNumber: string;
  detail: string;
  status: "active" | "pending";
};

export type Bill = {
  id: string;
  serviceId: string;
  kind: ServiceKind;
  periodStart: string;
  periodEnd: string;
  issued: string;
  due: string;
  amount: number;
  status: "due" | "paid" | "overdue";
  readType: "actual" | "estimated";
  usageKwh?: number;
  usageMj?: number;
};

export type UsagePoint = { label: string; kwh: number; cost: number; solarExportKwh: number };

export const household = {
  address: "12 Banksia Street, Newtown NSW 2042",
  shortAddress: "12 Banksia St, Newtown",
  state: "NSW",
  electricityDistributor: { name: "Ausgrid", phone: "13 13 88" },
  gasDistributor: { name: "Jemena Gas Networks", phone: "131 909" },
  meterNumber: "4102 8837 51",
  gasMeterNumber: "M 2231 9087",
  nmi: "4102 8837 51 6",
  savedCard: { brand: "Visa", last4: "4821" },
  bankAccount: "CommBank ••• 219",
  concession: null as null | { type: string; number: string },
  mailingAddress: "12 Banksia Street, Newtown NSW 2042",
  gasCredit: 64.2,
  nbnConnection: "FTTP",
  mobileNumber: "0412 555 019",
} as const;

export const services: Service[] = [
  {
    id: "svc-elec",
    kind: "electricity",
    name: "Electricity",
    plan: "Value Saver",
    accountNumber: "8123 441 902",
    detail: "Smart meter · Ausgrid network",
    status: "active",
  },
  {
    id: "svc-gas",
    kind: "gas",
    name: "Gas",
    plan: "Value Saver",
    accountNumber: "8123 441 919",
    detail: "Basic meter · Jemena network",
    status: "active",
  },
  {
    id: "svc-nbn",
    kind: "internet",
    name: "Internet",
    plan: "Home Fast nbn® 100",
    accountNumber: "INT-5520981",
    detail: "FTTP · eero 6+ modem",
    status: "active",
  },
  {
    id: "svc-mob",
    kind: "mobile",
    name: "Mobile",
    plan: "Medium 80GB SIM",
    accountNumber: "MOB-7730144",
    detail: "0412 555 019 · Optus Mobile Network",
    status: "active",
  },
];

export const bills: Bill[] = [
  {
    id: "bill-e-0925",
    serviceId: "svc-elec",
    kind: "electricity",
    periodStart: "2026-06-24",
    periodEnd: "2026-09-22",
    issued: "2026-09-24",
    due: "2026-10-14",
    amount: 487.35,
    status: "due",
    readType: "actual",
    usageKwh: 1214,
  },
  {
    id: "bill-g-0925",
    serviceId: "svc-gas",
    kind: "gas",
    periodStart: "2026-06-18",
    periodEnd: "2026-09-16",
    issued: "2026-09-19",
    due: "2026-10-09",
    amount: 212.8,
    status: "due",
    readType: "estimated",
    usageMj: 6120,
  },
  {
    id: "bill-n-0925",
    serviceId: "svc-nbn",
    kind: "internet",
    periodStart: "2026-09-05",
    periodEnd: "2026-10-04",
    issued: "2026-09-05",
    due: "2026-09-19",
    amount: 95,
    status: "paid",
    readType: "actual",
  },
  {
    id: "bill-m-0925",
    serviceId: "svc-mob",
    kind: "mobile",
    periodStart: "2026-09-12",
    periodEnd: "2026-10-11",
    issued: "2026-09-12",
    due: "2026-09-26",
    amount: 30,
    status: "paid",
    readType: "actual",
  },
  {
    id: "bill-e-0626",
    serviceId: "svc-elec",
    kind: "electricity",
    periodStart: "2026-03-25",
    periodEnd: "2026-06-23",
    issued: "2026-06-25",
    due: "2026-07-15",
    amount: 361.9,
    status: "paid",
    readType: "actual",
    usageKwh: 902,
  },
  {
    id: "bill-g-0626",
    serviceId: "svc-gas",
    kind: "gas",
    periodStart: "2026-03-19",
    periodEnd: "2026-06-17",
    issued: "2026-06-20",
    due: "2026-07-10",
    amount: 168.45,
    status: "paid",
    readType: "actual",
    usageMj: 4710,
  },
  {
    id: "bill-e-0326",
    serviceId: "svc-elec",
    kind: "electricity",
    periodStart: "2025-12-24",
    periodEnd: "2026-03-24",
    issued: "2026-03-26",
    due: "2026-04-15",
    amount: 402.15,
    status: "paid",
    readType: "actual",
    usageKwh: 1010,
  },
  {
    id: "bill-e-1225",
    serviceId: "svc-elec",
    kind: "electricity",
    periodStart: "2025-09-23",
    periodEnd: "2025-12-23",
    issued: "2025-12-27",
    due: "2026-01-16",
    amount: 372.6,
    status: "paid",
    readType: "actual",
    usageKwh: 986,
  },
  {
    id: "bill-e-0925-prev",
    serviceId: "svc-elec",
    kind: "electricity",
    periodStart: "2025-06-24",
    periodEnd: "2025-09-22",
    issued: "2025-09-24",
    due: "2025-10-14",
    amount: 398.1,
    status: "paid",
    readType: "actual",
    usageKwh: 988,
  },
];

export const monthlyUsage: UsagePoint[] = [
  { label: "Oct", kwh: 318, cost: 112.4, solarExportKwh: 0 },
  { label: "Nov", kwh: 301, cost: 106.9, solarExportKwh: 0 },
  { label: "Dec", kwh: 356, cost: 124.8, solarExportKwh: 0 },
  { label: "Jan", kwh: 402, cost: 139.1, solarExportKwh: 0 },
  { label: "Feb", kwh: 377, cost: 131.2, solarExportKwh: 0 },
  { label: "Mar", kwh: 331, cost: 116.6, solarExportKwh: 0 },
  { label: "Apr", kwh: 289, cost: 103.5, solarExportKwh: 0 },
  { label: "May", kwh: 322, cost: 114.3, solarExportKwh: 0 },
  { label: "Jun", kwh: 371, cost: 129.4, solarExportKwh: 0 },
  { label: "Jul", kwh: 436, cost: 150.2, solarExportKwh: 0 },
  { label: "Aug", kwh: 419, cost: 145.1, solarExportKwh: 0 },
  { label: "Sep", kwh: 359, cost: 125.7, solarExportKwh: 0 },
];

export const dailyUsage: UsagePoint[] = [
  { label: "Mon", kwh: 11.2, cost: 4.02, solarExportKwh: 0 },
  { label: "Tue", kwh: 12.8, cost: 4.41, solarExportKwh: 0 },
  { label: "Wed", kwh: 10.9, cost: 3.95, solarExportKwh: 0 },
  { label: "Thu", kwh: 13.4, cost: 4.56, solarExportKwh: 0 },
  { label: "Fri", kwh: 12.1, cost: 4.24, solarExportKwh: 0 },
  { label: "Sat", kwh: 16.7, cost: 5.38, solarExportKwh: 0 },
  { label: "Sun", kwh: 15.3, cost: 5.02, solarExportKwh: 0 },
];

export const internetUsage = { downloadedGb: 612, uploadedGb: 48, planSpeed: "nbn® 100", typicalEveningMbps: 94 };
export const mobileUsage = { usedGb: 31.4, allowanceGb: 80, daysLeft: 14 };

export function billsFor(kind: ServiceKind): Bill[] {
  return bills.filter((b) => b.kind === kind).sort((a, b) => b.issued.localeCompare(a.issued));
}

export function latestBill(kind: ServiceKind): Bill | undefined {
  return billsFor(kind)[0];
}

export function outstandingBills(): Bill[] {
  return bills.filter((b) => b.status !== "paid");
}

export function totalOutstanding(): number {
  return outstandingBills().reduce((sum, b) => sum + b.amount, 0);
}

/** Same quarter last year — used by the "higher than expected" explanation. */
export function comparableBill(bill: Bill): Bill | undefined {
  const lastYear = String(Number(bill.periodEnd.slice(0, 4)) - 1) + bill.periodEnd.slice(4);
  return bills.find((b) => b.kind === bill.kind && b.periodEnd === lastYear);
}
