import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { PlatformLayout } from "@/components/platform/PlatformLayout";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { DataTable, type Column } from "@/components/ui/DataTable";
import { EmptyState } from "@/components/ui/EmptyState";
import { Select, TextInput } from "@/components/ui/Field";
import { DEPARTMENTS, EMPLOYEES, LOCATIONS } from "@/data/platform";
import type { Employee } from "@/data/types";
import { formatCurrency, formatDate } from "@/lib/format";

const STATUS_TONE = {
  Active: "positive",
  Onboarding: "caution",
  "On leave": "info",
} as const;

export default function PlatformPeople() {
  const [query, setQuery] = useState("");
  const [department, setDepartment] = useState("All departments");
  const [location, setLocation] = useState("All locations");

  const rows = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return EMPLOYEES.filter((employee) => {
      const matchesQuery =
        !needle ||
        employee.name.toLowerCase().includes(needle) ||
        employee.jobTitle.toLowerCase().includes(needle);
      const matchesDepartment =
        department === "All departments" || employee.department === department;
      const matchesLocation = location === "All locations" || employee.location === location;
      return matchesQuery && matchesDepartment && matchesLocation;
    });
  }, [query, department, location]);

  const columns: Column<Employee>[] = [
    {
      key: "name",
      header: "Employee",
      render: (employee) => (
        <Link to={`/platform/people/${employee.id}`} className="focus-eh flex items-center gap-3">
          <Avatar name={employee.name} size="sm" />
          <span className="flex flex-col">
            <span className="font-bold text-ink-strong">{employee.name}</span>
            <span className="text-xs text-ink-faint">{employee.jobTitle}</span>
          </span>
        </Link>
      ),
    },
    {
      key: "department",
      header: "Department",
      hideBelow: "md",
      render: (employee) => employee.department,
    },
    { key: "location", header: "Location", hideBelow: "lg", render: (employee) => employee.location },
    {
      key: "type",
      header: "Type",
      hideBelow: "sm",
      render: (employee) => employee.employmentType,
    },
    {
      key: "started",
      header: "Started",
      hideBelow: "lg",
      render: (employee) => formatDate(employee.startDate),
    },
    {
      key: "rate",
      header: "Base rate",
      align: "right",
      hideBelow: "md",
      render: (employee) => `${formatCurrency(employee.baseRate)}/hr`,
    },
    {
      key: "status",
      header: "Status",
      align: "right",
      render: (employee) => <Badge tone={STATUS_TONE[employee.status]}>{employee.status}</Badge>,
    },
  ];

  return (
    <PlatformLayout
      title="People"
      description={`${EMPLOYEES.length} employees across ${LOCATIONS.length} venues`}
    >
      <div className="mb-5 flex flex-col gap-3 md:flex-row">
        <TextInput
          type="search"
          aria-label="Search employees"
          placeholder="Search by name or job title"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <Select
          aria-label="Filter by department"
          value={department}
          onChange={(event) => setDepartment(event.target.value)}
          className="md:max-w-xs"
        >
          <option>All departments</option>
          {DEPARTMENTS.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </Select>
        <Select
          aria-label="Filter by location"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          className="md:max-w-xs"
        >
          <option>All locations</option>
          {LOCATIONS.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </Select>
      </div>

      {rows.length ? (
        <DataTable columns={columns} rows={rows} rowKey={(employee) => employee.id} caption="Employee directory" />
      ) : (
        <EmptyState
          title="No employees match those filters"
          body="Clear the search or reset the department and location filters."
        />
      )}
    </PlatformLayout>
  );
}
