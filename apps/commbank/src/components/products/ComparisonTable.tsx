import { Link } from "react-router-dom";
import type { Product } from "@/data/types";

export function ComparisonTable({ products, caption }: { products: Product[]; caption: string }) {
  return (
    <div className="overflow-x-auto rounded-cba-lg border border-line-soft">
      <table className="w-full min-w-[720px] border-collapse text-left text-[15px]">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="bg-surface-tint">
            <th scope="col" className="px-4 py-3 font-bold text-ink">
              Product
            </th>
            <th scope="col" className="px-4 py-3 font-bold text-ink">
              Headline
            </th>
            <th scope="col" className="px-4 py-3 font-bold text-ink">
              Best for
            </th>
            <th scope="col" className="px-4 py-3 font-bold text-ink">
              Key fee
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line-soft">
          {products.map((product) => (
            <tr key={product.slug} className="align-top">
              <th scope="row" className="px-4 py-4 font-normal">
                <Link
                  to={`/products/${product.slug}`}
                  className="focus-cba font-bold text-ink underline underline-offset-4"
                >
                  {product.name}
                </Link>
                <span className="block text-[13px] text-ink-faint">{product.tagline}</span>
              </th>
              <td className="px-4 py-4">
                <span className="font-bold text-ink">{product.headline?.value ?? "—"}</span>
                <span className="block text-[13px] text-ink-faint">
                  {product.headline?.label ?? ""}
                </span>
              </td>
              <td className="px-4 py-4 text-ink-soft">{product.bestFor}</td>
              <td className="px-4 py-4 text-ink-soft">
                {product.fees[0] ? `${product.fees[0].label}: ${product.fees[0].value}` : "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
