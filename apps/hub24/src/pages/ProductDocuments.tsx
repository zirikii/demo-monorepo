import { useMemo, useState } from "react";
import { Download, FileText } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { Badge } from "@/components/ui/Badge";
import { DataTable, type Column } from "@/components/ui/DataTable";
import { SelectField, TextField } from "@/components/ui/Field";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DOCUMENT_KINDS, DOCUMENT_PRODUCTS, filterDocuments } from "@/data/documents";
import type { ProductDocument } from "@/data/types";
import { shortDate } from "@/lib/format";

export default function ProductDocumentsPage() {
  const [kind, setKind] = useState("All");
  const [product, setProduct] = useState("All");
  const [query, setQuery] = useState("");

  const documents = useMemo(() => filterDocuments(kind, product, query), [kind, product, query]);

  const columns: Column<ProductDocument>[] = [
    {
      key: "title",
      header: "Document",
      render: (row) => (
        <span className="flex items-center gap-3">
          <FileText aria-hidden className="h-4 w-4 shrink-0 text-hub-blue" />
          <span className="font-semibold text-ink-strong">{row.title}</span>
        </span>
      ),
    },
    { key: "product", header: "Product", render: (row) => row.product },
    { key: "kind", header: "Type", render: (row) => <Badge tone="neutral">{row.kind}</Badge> },
    { key: "updated", header: "Updated", render: (row) => shortDate(row.updated) },
    { key: "size", header: "Size", align: "right", render: (row) => row.size },
    {
      key: "action",
      header: "",
      align: "right",
      render: (row) => (
        <button
          type="button"
          onClick={() => window.alert(`Demo only — ${row.title} is not a real document.`)}
          className="focus-hub inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs font-bold text-hub-blue transition hover:border-hub-blue"
        >
          <Download aria-hidden className="h-3.5 w-3.5" />
          Download
        </button>
      ),
    },
  ];

  return (
    <PageLayout title="Product documents">
      <PageHero
        eyebrow="Support"
        title="Product documents"
        body="Product disclosure statements, target market determinations, guides and forms for the HUB24 Platform."
        crumbs={[{ label: "Home", to: "/" }, { label: "Product documents" }]}
      />

      <Section>
        <SectionHeading
          eyebrow="Library"
          title="Find a document"
          body="Filter by product or document type, or search by name."
        />

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <TextField
            label="Search"
            placeholder="Search by document or product"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <SelectField
            label="Document type"
            value={kind}
            onChange={(event) => setKind(event.target.value)}
            options={DOCUMENT_KINDS.map((option) => ({ value: option, label: option }))}
          />
          <SelectField
            label="Product"
            value={product}
            onChange={(event) => setProduct(event.target.value)}
            options={DOCUMENT_PRODUCTS.map((option) => ({ value: option, label: option }))}
          />
        </div>

        <p className="mt-6 text-sm font-semibold text-ink-faint">
          Showing {documents.length} of {filterDocuments("All", "All", "").length} documents
        </p>

        <DataTable
          className="mt-3"
          caption="HUB24 product documents"
          columns={columns}
          rows={documents}
          rowKey={(row) => row.id}
          emptyMessage="No documents match those filters."
        />

        <p className="mt-6 text-sm text-ink-faint">
          Demo library. No files are hosted — the download action shows a notice instead.
        </p>
      </Section>
    </PageLayout>
  );
}
