import { useState } from "react";
import { FileText } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { Badge } from "@/components/ui/Badge";
import { DataTable } from "@/components/ui/DataTable";
import { EmptyState } from "@/components/ui/EmptyState";
import { Field, Select, TextInput } from "@/components/ui/Field";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DOCUMENT_PRODUCTS, DOCUMENT_TYPES, PRODUCT_DOCUMENTS } from "@/data/documents";
import { formatDate, formatNumber } from "@/lib/format";

export default function ProductDocumentsPage() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("All types");
  const [product, setProduct] = useState("All products");

  const documents = PRODUCT_DOCUMENTS.filter((document) => {
    const matchesQuery = document.name.toLowerCase().includes(query.trim().toLowerCase());
    const matchesType = type === "All types" || document.type === type;
    const matchesProduct = product === "All products" || document.product === product;
    return matchesQuery && matchesType && matchesProduct;
  }).sort((a, b) => b.updated.localeCompare(a.updated));

  return (
    <PageLayout title="Product documents">
      <PageHero
        eyebrow="Resources"
        title="HUB24 product documents"
        body="Disclosure documents, investment booklets, target market determinations and forms across every HUB24 product."
        crumbs={[{ label: "Home", to: "/" }, { label: "Product documents" }]}
      />

      <Section>
        <SectionHeading eyebrow="Library" title="Find a document" />

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <Field label="Search" htmlFor="doc-search">
            <TextInput
              id="doc-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="e.g. investment booklet"
            />
          </Field>
          <Field label="Document type" htmlFor="doc-type">
            <Select id="doc-type" value={type} onChange={(event) => setType(event.target.value)}>
              <option>All types</option>
              {DOCUMENT_TYPES.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Product" htmlFor="doc-product">
            <Select id="doc-product" value={product} onChange={(event) => setProduct(event.target.value)}>
              <option>All products</option>
              {DOCUMENT_PRODUCTS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </Field>
        </div>

        <p className="mt-4 text-sm text-ink-faint">
          Showing {documents.length} of {PRODUCT_DOCUMENTS.length} documents
        </p>

        <DataTable
          className="mt-6"
          caption="HUB24 product documents"
          rowKey={(document) => document.id}
          rows={documents}
          empty={
            <EmptyState
              className="mt-6"
              title="No documents match your filters"
              body="Clear the search box or widen the type and product selection."
            />
          }
          columns={[
            {
              key: "name",
              header: "Document",
              render: (document) => (
                <span className="flex items-center gap-3">
                  <FileText aria-hidden className="h-4 w-4 shrink-0 text-h24-teal" />
                  <span className="font-medium text-ink-strong">{document.name}</span>
                </span>
              ),
            },
            { key: "product", header: "Product", render: (document) => document.product },
            {
              key: "type",
              header: "Type",
              render: (document) => <Badge tone="neutral">{document.type}</Badge>,
            },
            {
              key: "updated",
              header: "Updated",
              align: "right",
              render: (document) => formatDate(document.updated),
            },
            {
              key: "size",
              header: "Size",
              align: "right",
              render: (document) => `${formatNumber(document.sizeKb)} KB`,
            },
          ]}
        />

        <p className="mt-6 text-xs text-ink-faint">
          These entries are placeholders for a demonstration build — nothing downloads. In the real
          world, disclosure documents including the IDPS Guide for HUB24 Invest, the PDS for HUB24
          Super and the PDS for the HUB24 Managed Portfolio Service, along with the relevant target
          market determinations, are published here.
        </p>
      </Section>
    </PageLayout>
  );
}
