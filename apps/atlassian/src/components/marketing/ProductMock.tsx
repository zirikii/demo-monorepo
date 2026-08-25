import { AppMark } from "@/components/brand/AppMark";

export function ProductMock({ slug }: { slug: string }) {
  if (slug === "confluence") {
    const types = ["Live docs", "Whiteboards", "Databases", "Pages", "Videos", "Slides"];
    return (
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {types.map((type) => (
          <div key={type} className="border border-line bg-white p-4 transition hover:shadow-atl-lift">
            <AppMark slug="confluence" size={28} />
            <p className="mt-3 text-sm font-bold text-ink-strong">{type}</p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="border border-line bg-surface-tint p-5">
      <div className="mb-4 flex items-center gap-2">
        <AppMark slug={slug} size={28} />
        <p className="text-sm font-bold text-ink-strong">
          {slug === "jira" ? "PORTAL board" : "Workspace"}
        </p>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {["To do", "In progress", "Done"].map((column, index) => (
          <div key={column} className="rounded-atl-sm bg-white p-2">
            <p className="text-[0.65rem] font-bold tracking-wide text-ink-faint uppercase">{column}</p>
            <div className="mt-2 space-y-2">
              <div className="h-10 rounded-atl-sm bg-atl-tint" />
              {index < 2 ? <div className="h-10 rounded-atl-sm bg-surface-deep" /> : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
