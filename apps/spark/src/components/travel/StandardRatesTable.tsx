import { standardRates } from "@/data/rates";

export function StandardRatesTable() {
  return (
    <div className="overflow-hidden rounded-[2rem] border border-line bg-white shadow-card">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-line text-left text-sm">
          <caption className="sr-only">Standard Spark casual rates for calls, texts and data</caption>
          <thead className="bg-spark-lilac">
            <tr>
              <th scope="col" className="px-5 py-4 font-black text-ink">
                Service
              </th>
              <th scope="col" className="px-5 py-4 font-black text-ink">
                Standard rate
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {standardRates.map((rate) => (
              <tr key={rate.service}>
                <th scope="row" className="px-5 py-4 font-semibold text-ink-soft">
                  {rate.service}
                </th>
                <td className="px-5 py-4 font-black text-spark-purple">{rate.rate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
