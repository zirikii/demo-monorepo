export type RequestType = "Incident" | "Service request" | "Change";
export type RequestStatus = "Waiting for support" | "In progress" | "Pending" | "Resolved";

export interface ServiceRequest {
  key: string;
  summary: string;
  type: RequestType;
  status: RequestStatus;
  requester: string;
  assignee: string;
  sla: string;
  description: string;
}

export const SERVICE_QUEUES: RequestType[] = ["Incident", "Service request", "Change"];

export const REQUEST_STATUSES: RequestStatus[] = [
  "Waiting for support",
  "In progress",
  "Pending",
  "Resolved",
];

export const SERVICE_REQUESTS: ServiceRequest[] = [
  {
    key: "ITSM-14",
    summary: "VPN down for Harbour Digital office",
    type: "Incident",
    status: "In progress",
    requester: "Alex Nguyen",
    assignee: "Jordan Hale",
    sla: "2h remaining",
    description: "Harbour Digital cannot reach the partner portal over VPN since 07:40. Linked to PORTAL-155 feature gates.",
  },
  {
    key: "ITSM-22",
    summary: "New laptop for Maya Chen",
    type: "Service request",
    status: "Waiting for support",
    requester: "Maya Chen",
    assignee: "Unassigned",
    sla: "3d remaining",
    description: "Standard engineering kit plus YubiKey. Needed before the PORTAL Sprint 24 demo.",
  },
  {
    key: "ITSM-31",
    summary: "Change window for account service extract",
    type: "Change",
    status: "Pending",
    requester: "Maya Chen",
    assignee: "Jordan Hale",
    sla: "CAB Thu 16:00",
    description: "PORTAL-118 cutover. Freeze partner onboarding during the window.",
  },
  {
    key: "ITSM-08",
    summary: "Password reset loop on Safari",
    type: "Incident",
    status: "Resolved",
    requester: "Nadia Fischer",
    assignee: "Sam Okonkwo",
    sla: "Met",
    description: "Related to PORTAL-088 passkeys. Users on Safari 17 were bouncing between reset emails.",
  },
];

export function getServiceRequest(
  key: string,
  requests = SERVICE_REQUESTS,
): ServiceRequest | undefined {
  return requests.find((request) => request.key.toLowerCase() === key.toLowerCase());
}
