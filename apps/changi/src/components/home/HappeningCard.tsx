import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/Badge";
import type { Happening } from "@/types";

export function HappeningCard({ happening }: { happening: Happening }) {
  return (
    <Link to={happening.href} className="card-shadow group overflow-hidden rounded-[2rem] bg-white ring-1 ring-[#eadfd3] transition hover:-translate-y-1">
      <img src={happening.image} alt="" className="h-52 w-full object-cover transition duration-500 group-hover:scale-105" />
      <div className="p-6">
        <Badge>{happening.category}</Badge>
        <h3 className="mt-4 text-xl font-bold leading-tight text-[#2f271f]">{happening.title}</h3>
        <p className="mt-3 text-sm leading-6 text-[#665448]">{happening.description}</p>
      </div>
    </Link>
  );
}
