import { SERVICE_REQUESTS, type RequestStatus, type ServiceRequest } from "@/data/jsm";
import { readCollection, writeCollection } from "./store";

const KEY = "atlassian-demo-requests";

export function readRequests(): ServiceRequest[] {
  return readCollection(KEY, SERVICE_REQUESTS);
}

export function writeRequests(requests: ServiceRequest[]): void {
  writeCollection(KEY, requests);
}

export function getStoredRequest(key: string): ServiceRequest | undefined {
  return readRequests().find((request) => request.key.toLowerCase() === key.toLowerCase());
}

export function updateRequestStatus(key: string, status: RequestStatus): ServiceRequest[] {
  const next = readRequests().map((request) =>
    request.key === key ? { ...request, status } : request,
  );
  writeRequests(next);
  return next;
}
