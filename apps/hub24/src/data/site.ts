export const SITE = {
  name: "HUB24",
  legalName: "HUB24 Limited",
  asx: "HUB",
  abn: "87 124 891 685",
  descriptor: "Australia’s best platform — integrated platform, technology and data solutions for advisers and their clients.",
  purpose: "Empowering better financial futures, together.",
  supportPhone: "1300 854 994",
  investorPhone: "1300 508 797",
  supportEmail: "support@hub24.demo",
  adminEmail: "admin@hub24.demo",
  postal: "GPO Box 529, Sydney NSW 2001",
  afsl: {
    custodial: "HUB24 Custodial Services Ltd (ABN 94 073 633 664, AFSL 239 122)",
    trustee: "HTFS Nominees Pty Limited (ABN 78 000 880 553, AFSL 232 500, RSE L0003216)",
  },
};

export const DEMO_CREDENTIALS = {
  email: "adviser@hub24.demo",
  password: "demo",
  investorEmail: "investor@hub24.demo",
  managerEmail: "manager@hub24.demo",
};

export const DISCLAIMER =
  "Unofficial demo — not affiliated with HUB24 Limited or its subsidiaries. Dummy data only; not an offer of financial products.";

export const LEGAL_FOOTNOTE = `${SITE.legalName} (ABN ${SITE.abn} ASX:${SITE.asx}) operates this website on behalf of the HUB24 Group. ${SITE.afsl.custodial} is the operator of HUB24 Invest (an IDPS) and a promoter of HUB24 Super. The trustee and issuer of interests in HUB24 Super is ${SITE.afsl.trustee}. This demo does not provide financial advice.`;

export const STATS = [
  { value: "$112.7bn", label: "Platform FUA (illustrative)" },
  { value: "#1", label: "Rated Best Platform Overall" },
  { value: "3", label: "Investment menus — Discover, Core, Choice" },
  { value: "ASX 100", label: "HUB24 Limited (ASX:HUB)" },
];
