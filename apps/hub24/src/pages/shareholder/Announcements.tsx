import { useState } from "react";
import { Download } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { ShareholderNav } from "@/components/marketing/ShareholderNav";
import { Badge } from "@/components/ui/Badge";
import { DataTable } from "@/components/ui/DataTable";
import { EmptyState } from "@/components/ui/EmptyState";
import { Field, Select, TextInput } from "@/components/ui/Field";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Toggle } from "@/components/ui/Toggle";
import { ANNOUNCEMENT_CATEGORIES, ANNOUNCEMENTS } from "@/data/shareholder";
import { formatDate } from "@/lib/format";

export default function AnnouncementsPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All categories");
  const [priceSensitiveOnly, setPriceSensitiveOnly] = useState(false);

  const announcements = ANNOUNCEMENTS.filter((announcement) => {
    const matchesQuery = announcement.title.toLowerCase().includes(query.trim().toLowerCase());
    const matchesCategory = category === "All categories" || announcement.category === category;
    const matchesSensitivity = !priceSensitiveOnly || announcement.priceSensitive;
    return matchesQuery && matchesCategory && matchesSensitivity;
  });

  return (
    <PageLayout title="ASX announcements">
      <PageHero
        eyebrow="Shareholder Centre"
        title="ASX announcements"
        body="Market updates, results, presentations and governance announcements lodged with the ASX."
        crumbs={[
          { label: "Home", to: "/" },
          { label: "Shareholder Centre", to: "/shareholder-centre/overview/" },
          { label: "ASX announcements" },
        ]}
      />

      <ShareholderNav />

      <Section>
        <SectionHeading eyebrow="Filter" title="Find an announcement" />

        <div className="mt-6 grid gap-5 md:grid-cols-[1fr_1fr_auto] md:items-end">
          <Field label="Search" htmlFor="asx-search">
            <TextInput
              id="asx-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="e.g. market update"
            />
          </Field>
          <Field label="Category" htmlFor="asx-category">
            <Select id="asx-category" value={category} onChange={(event) => setCategory(event.target.value)}>
              <option>All categories</option>
              {ANNOUNCEMENT_CATEGORIES.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </Field>
          <Toggle
            className="pb-3"
            checked={priceSensitiveOnly}
            onChange={setPriceSensitiveOnly}
            label="Price sensitive only"
          />
        </div>

        <p className="mt-4 text-sm text-ink-faint">
          Showing {announcements.length} of {ANNOUNCEMENTS.length} announcements
        </p>

        <DataTable
          className="mt-6"
          caption="ASX announcements for HUB24 Limited"
          rowKey={(announcement) => announcement.id}
          rows={announcements}
          empty={
            <EmptyState
              className="mt-6"
              title="No announcements match those filters"
              body="Try clearing the search or turning off the price-sensitive filter."
            />
          }
          columns={[
            {
              key: "date",
              header: "Date",
              render: (announcement) => (
                <span className="whitespace-nowrap text-ink-faint">{formatDate(announcement.date)}</span>
              ),
            },
            {
              key: "title",
              header: "Announcement",
              render: (announcement) => (
                <div className="flex flex-col gap-1">
                  <span className="font-medium text-ink-strong">{announcement.title}</span>
                  <span className="text-xs text-ink-faint">{announcement.summary}</span>
                </div>
              ),
            },
            {
              key: "category",
              header: "Category",
              render: (announcement) => <Badge tone="neutral">{announcement.category}</Badge>,
            },
            {
              key: "sensitive",
              header: "Price sensitive",
              render: (announcement) =>
                announcement.priceSensitive ? (
                  <Badge tone="caution">Yes</Badge>
                ) : (
                  <span className="text-ink-ghost">No</span>
                ),
            },
            {
              key: "download",
              header: "PDF",
              align: "right",
              render: () => (
                <span className="inline-flex items-center gap-1.5 text-xs text-ink-ghost">
                  <Download aria-hidden className="h-3.5 w-3.5" />
                  Demo only
                </span>
              ),
            },
          ]}
        />
      </Section>
    </PageLayout>
  );
}
