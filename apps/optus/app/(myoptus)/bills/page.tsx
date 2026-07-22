import { readJson } from "@/lib/data/json-store";
import type { Bill } from "@/lib/types";
import { formatAud, formatShortDate } from "@/lib/utils/format";

export default async function BillsPage() {
  const bills = await readJson<Bill[]>("bills.json");
  return (
    <div className="rounded-2xl border border-line bg-white p-6 shadow-sm">
      <h2 className="text-3xl font-black text-optus-ink">Bills</h2>
      <table className="mt-6 w-full text-left text-sm">
        <thead>
          <tr className="border-b border-line">
            <th className="py-3">Period</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Due</th>
          </tr>
        </thead>
        <tbody>
          {bills.map((bill) => (
            <tr key={bill.id} className="border-b border-line/60">
              <td className="py-3 font-bold">{bill.period}</td>
              <td>{formatAud(bill.amount, { cents: true })}</td>
              <td>{bill.status}</td>
              <td>{formatShortDate(bill.dueDate)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
