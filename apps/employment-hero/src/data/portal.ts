type PortalConfig = {
  name: string;
  tagline: string;
};

export const portalConfig = {
  EmploymentHero: {
    name: "Employment Hero",
    tagline: "HR, payroll and hiring for employers",
  },
  EHWork: {
    name: "EH Work",
    tagline: "Work, money, career and benefits for employees",
  },
  PayrollClassic: {
    name: "Payroll Classic",
    tagline: "Access your classic payroll workspace",
  },
} satisfies Record<string, PortalConfig>;
